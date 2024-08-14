import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreatePersonnelBcwsDTO, CreateBcwsPersonnelLanguagesDTO } from './dto';
import { GetBcwsPersonnelDTO } from './dto/get-bcws-personnel.dto';
import { UpdateBcwsPersonnelDTO } from './dto/update-bcws-personnel.dto';
import { BcwsRO } from './ro';
import { BcwsSectionsRO } from './ro/bcws-sections.ro';
import { Role, Program } from '../auth/interface';
import { BcwsRole, BcwsRoleName, SectionName, Status } from '../common/enums';
import { BcwsPersonnelEntity, LanguageEntity } from '../database/entities/bcws';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelDTO } from '../personnel';
import { PersonnelService } from '../personnel/personnel.service';
import { TravelPreference } from '../common/enums/travel-preference.enum';

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
    private certificationRepository: Repository<BcwsCertificationEntity>,
    @InjectRepository(BcwsRoleEntity)
    private roleRepository: Repository<BcwsRoleEntity>,
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
      const allCertifications = await this.certificationRepository.find();
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

    if (query.fireCentre?.length && !query.location?.length) {
      qb.andWhere('location.fireCentre IN (:...fireCentres)', {
        fireCentres: query.fireCentre,
      });
    } else if (query.location?.length) {
      if (!query.includeTravel) {
        qb.andWhere('location.locationName IN (:...homeLocations)', {
          homeLocations: query.location,
        });
      } else if (query.includeTravel) {
        qb.andWhere('bcws_personnel.travelPreference != :remoteOnly', { remoteOnly: TravelPreference.REMOTE_ONLY });
        qb.andWhere(new Brackets((inner) => {
          inner.orWhere('location.locationName IN (:...homeLocations)', {
            homeLocations: query.location,
          });
          inner.orWhere('bcws_personnel.travelPreference = :travelAnywhere', { travelAnywhere: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE });
          inner.orWhere(
            `(bcws_personnel.travelPreference = :travelFireZone
            AND location.fireZone IN (SELECT fire_zone FROM "location" WHERE location_name IN (:...homeLocations)))`, {
              travelFireZone: TravelPreference.WILLING_TO_TRAVEL_FIRE_ZONE,
              homeLocations: query.location,
            });
            inner.orWhere(
            '(bcws_personnel.travelPreference = :travelFireCentre AND location.fireCentre IN (:...fireCentres))',{
              travelFireCentre: TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE,
              fireCentres: query.fireCentre,
            });
        }));
      }
    }

    if (query.role) {
      qb.andWhere('role.name = :role', {
        role: query.role,
      });
      if (query.experience) {
        qb.andWhere('roles.expLevel = :experienceLevel', {
          experienceLevel: query.experience,
        });
      }
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

  /**
   * Get all roles
   * @returns
   */
  async getAllRoles(): Promise<BcwsRoleEntity[]> {
    return this.roleRepository.find();
  }
  /**
   * Returns certifications that are not OFA I, II, or III
   * Used by CHEFS form
   * @returns {BcwsCertificationEntity[]} List of certifications
   *
   */
  async getCertificates(
    filterCommonCerts: boolean,
  ): Promise<BcwsCertificationEntity[]> {
    const certificates = await this.certificationRepository.find();
    if (!filterCommonCerts) {
      return certificates;
    } else {
      // filter out the OFA I, II, and III certifications and the PFA certification as these are listed separately on the CHEFS form
      return certificates.filter((itm) => ![2, 8, 9, 10].includes(itm.id));
    }
  }

  /**
   * Returns all tools
   * Used by CHEFS form
   * @returns {BcwsToolsEntity[]} List of tools
   */
  async getTools(): Promise<BcwsToolsEntity[]> {
    return this.toolsRepository.find();
  }

  /**
   * Returns all roles with readable role/section names and id  grouped by sections
   * Used by CHEFS form and front end to display list of roles
   * @returns {RolesDataRO} List of roles
   */
  async getRoles(): Promise<BcwsSectionsRO> {
    const roles = await this.roleRepository.find();

    const sectionsAndRoles = roles.reduce((acc, role) => {
      const key = role.section;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        name: BcwsRoleName[role.name],
        enumName: BcwsRole[role.name],
        id: role.id,
        section: SectionName[role.section],
      });
      return acc;
    }, {});

    return sectionsAndRoles;
  }
}
