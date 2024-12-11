import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreatePersonnelBcwsDTO } from './dto';
import { GetBcwsPersonnelDTO } from './dto/get-bcws-personnel.dto';
import { UpdateBcwsPersonnelDTO } from './dto/update-bcws-personnel.dto';
import { BcwsRO } from './ro';
import { BcwsSectionsRO } from './ro/bcws-sections.ro';
import { Role, Program } from '../auth/interface';
import { BcwsRole, BcwsRoleName, SectionName, Status } from '../common/enums';
import { TravelPreference } from '../common/enums/travel-preference.enum';
import { BcwsPersonnelEntity } from '../database/entities/bcws';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
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
    role: Role[],
  ) {
    this.logger.log(`Updating personnel ${id}`);
    const person = await this.personnelService.findOne(id);
    const bcws = await this.bcwsPersonnelRepository.findOne({
      where: { personnel: { id } },
    });

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

    return await this.bcwsPersonnelRepository.save(
      this.bcwsPersonnelRepository.create(
        new BcwsPersonnelEntity(bcwsPersonnel),
      ),
    );
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
    qb.leftJoinAndSelect('personnel.recommitment', 'recommitment');

    await this.personnelService.addQueryBuilderCommonFilters(
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
        qb.andWhere('bcws_personnel.travelPreference != :remoteOnly', {
          remoteOnly: TravelPreference.REMOTE_ONLY,
        });
        qb.andWhere(
          new Brackets((inner) => {
            inner.orWhere('location.locationName IN (:...homeLocations)', {
              homeLocations: query.location,
            });
            inner.orWhere('bcws_personnel.travelPreference = :travelAnywhere', {
              travelAnywhere: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
            });
            inner.orWhere(
              `(bcws_personnel.travelPreference = :travelFireZone
            AND location.fireZone IN (SELECT fire_zone FROM "location" WHERE location_name IN (:...homeLocations)))`,
              {
                travelFireZone: TravelPreference.WILLING_TO_TRAVEL_FIRE_ZONE,
                homeLocations: query.location,
              },
            );
            inner.orWhere(
              '(bcws_personnel.travelPreference = :travelFireCentre AND location.fireCentre IN (:...fireCentres))',
              {
                travelFireCentre:
                  TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE,
                fireCentres: query.fireCentre,
              },
            );
          }),
        );
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
    role: Role[],
    id: string,
  ): Promise<Record<string, BcwsRO>> {
    const person = await this.personnelService.findOne(id);
    const bcws = await this.bcwsPersonnelRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['roles', 'roles.role', 'personnel'],
    });

    const lastDeployed = await this.personnelService.getLastDeployedDate(id);
    bcws.personnel = person;

    return bcws.toResponseObject(role, lastDeployed);
  }

  /**
   * Get all roles
   * @returns
   */
  async getAllRoles(): Promise<BcwsRoleEntity[]> {
    return this.roleRepository.find();
  }

  /**
   * Returns all roles with readable role/section names and id  grouped by sections
   * Used by CHEFS form and front end to display list of roles
   * @returns {RolesDataRO} List of roles
   */
  async getRoles(): Promise<BcwsSectionsRO> {
    const roles = await this.roleRepository.find({ order: { section: 'ASC' }});

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
