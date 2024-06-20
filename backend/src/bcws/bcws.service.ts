import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonnelBcwsDTO, CreateBcwsPersonnelLanguagesDTO } from './dto';
import { GetBcwsPersonnelDTO } from './dto/get-bcws-personnel.dto';
import { UpdateBcwsPersonnelDTO } from './dto/update-bcws-personnel.dto';
import { BcwsRO } from './ro';
import { Role, Program } from '../auth/interface';
import { Status } from '../common/enums';
import { BcwsPersonnelEntity, LanguageEntity } from '../database/entities/bcws';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelDTO } from '../personnel';
import { PersonnelService } from '../personnel/personnel.service';

@Injectable()
export class BcwsService {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    @InjectRepository(BcwsPersonnelEntity)
    private bcwsPersonnelRepository: Repository<BcwsPersonnelEntity>,
    @InjectRepository(BcwsToolsEntity)
    private toolsRepository: Repository<BcwsToolsEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(BcwsCertificationEntity)
    private cetificationRepository: Repository<BcwsCertificationEntity>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelService.name);
  }

  /**
   * update personnel/bcws personnel
   * @param id
   * @param personnel
   * @param role
   * @returns
   */
  async updateBcwsPersonnel(
    id: string,
    personnel: UpdateBcwsPersonnelDTO & UpdatePersonnelDTO,
    role: Role,
  ) {
    this.logger.log(`Updating personnel ${id}`);
    const person = await this.personnelService.findOne(id);
    const bcws = await this.bcwsPersonnelRepository.findOne({
      where: { personnel: { id } },
    });

    this.logger.log(`${JSON.stringify(personnel)}`);
    if (personnel.tools?.[0]?.hasOwnProperty('tool')) {
      const allTools = await this.toolsRepository.find();
      const personnelTools = personnel.tools.map((t) => ({
        toolId: allTools.find((at) => at.name === t.tool).id,
        proficiencyLevel: t.proficiencyLevel,
      }));
      personnel.tools = personnelTools;
    }

    if (personnel.languages) {
      const currentLanguages = await this.languageRepository.find({
        where: { personnel: { personnelId: id } },
      });
      const updatedLanguageNames = personnel.languages.map((l) => l.language);
      const deletedLanguagesIds = currentLanguages
        .filter((cl) => !updatedLanguageNames.includes(cl.language))
        .map((cl) => cl.id);
      if (deletedLanguagesIds.length) {
        await this.languageRepository.delete(deletedLanguagesIds);
      }

      const currentLanguagesNames = currentLanguages.map((cl) => cl.language);
      const newLanguages = personnel.languages
        .filter((l) => !currentLanguagesNames.includes(l.language))
        .map((l) => ({
          personnelId: bcws.personnelId,
          ...l,
        }));
      await this.languageRepository.save(newLanguages);
      delete personnel.languages;
    }

    if (personnel.certifications?.[0]?.hasOwnProperty('name')) {
      const allCertifications = await this.cetificationRepository.find();
      const personnelCerts = personnel.certifications.map((c) => ({
        certificationId: allCertifications.find((ac) => ac.name === c.name).id,
        expiry: c.expiry,
      }));
      personnel.certifications = personnelCerts;
    }

    Object.keys(personnel).forEach((key) => {
      person[key] = personnel[key];
      bcws[key] = personnel[key];
    });

    try {
      // This is a 'save' rather than 'update' to allow for updating many-to-many relations
      await this.personnelService.save(person);
      await this.bcwsPersonnelRepository.save(bcws);

      return this.getBcwsPersonnelById(role, id);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Create BCWS Personnel Data
   * @param bcwsPersonnel
   * @param id
   * @returns
   */
  async createBcwsPersonnel(
    bcwsPersonnel: CreatePersonnelBcwsDTO,
    id: string,
  ): Promise<BcwsPersonnelEntity> {
    bcwsPersonnel.personnelId = id;

    const languages = this.parseLanguages(bcwsPersonnel.languages, id);
    bcwsPersonnel.languages = languages;

    return await this.bcwsPersonnelRepository.save(
      this.bcwsPersonnelRepository.create(
        new BcwsPersonnelEntity(bcwsPersonnel),
      ),
    );
  }

  /**
   * Format Languages for saving in the database
   * @param languages
   * @param personnelId
   * @returns
   */
  parseLanguages(
    languages: Partial<CreateBcwsPersonnelLanguagesDTO>[],
    personnelId: string,
  ): CreateBcwsPersonnelLanguagesDTO[] {
    return languages.map((itm) => ({
      personnelId,
      language: itm.language,
      level: itm.level,
      type: itm.type,
    }));
  }

  /**
   * Get BCWS Personnel
   * Given specific queries, get associated personnel and their function experiences
   * @param query Includes pagination query, ie. page and number of rows
   * @returns {BcwsPersonnelEntity[]} List of personnel
   * @returns {number} Count of total personnel search applies to
   */
  async getBcwsPersonnel(query: GetBcwsPersonnelDTO): Promise<{
    personnel: BcwsPersonnelEntity[];
    count: {
      [Status.ACTIVE]: number;
      [Status.INACTIVE]: number;
      [Status.PENDING]: number;
    };
  }> {
    this.logger.log(`Query: ${JSON.stringify(query)}`);
    const qb =
      this.bcwsPersonnelRepository.createQueryBuilder('bcws_personnel');
    qb.leftJoinAndSelect('bcws_personnel.personnel', 'personnel');
    qb.leftJoinAndSelect('bcws_personnel.roles', 'roles');
    qb.leftJoinAndSelect('roles.role', 'role');
    qb.leftJoinAndSelect('personnel.homeLocation', 'location');

    this.personnelService.addQueryBuilderCommonFilters(
      qb,
      query.name,
      query.availabilityType,
      query.availabilityFromDate,
      query.availabilityToDate,
    );

    if (query.fireCentre?.length) {
      qb.andWhere('location.fireCentre IN (:...fireCentres)', {
        fireCentres: query.fireCentre,
      });
    }
    if (query.location?.length) {
      qb.andWhere('location.locationName IN (:...homeLocations)', {
        homeLocations: query.location,
      });
    }

    if (query.role) {
      qb.andWhere('role.name = :role', {
        role: query.role,
      });
    }

    const { personnel, count } =
      await this.personnelService.getPersonnelForProgram<BcwsPersonnelEntity>(
        Program.BCWS,
        qb,
        query.rows,
        query.page,
        query.status,
      );
    return { personnel, count };
  }

  /**
   * Get Personnel By ID
   * Returns a default availability range of 31 days for a single personnel
   * @returns {EmcrPersonnelEntity} Single personnel
   */
  async getBcwsPersonnelById(
    role: Role,
    id: string,
  ): Promise<Record<string, BcwsRO>> {
    const person = await this.bcwsPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: [
        'personnel',
        'roles',
        'roles.role',
        'certifications',
        'certifications.certification',
        'tools',
        'tools.tool',
      ],
    });

    const languages = await this.languageRepository.find({
      where: { personnel: { personnelId: id } },
    });
    person.languages = languages;
    const lastDeployed = await this.personnelService.getLastDeployedDate(id);
    const personnel = person.toResponseObject(role, lastDeployed);

    return personnel;
  }
}
