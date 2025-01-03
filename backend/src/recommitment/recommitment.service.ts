import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program, RequestWithRoles, Role } from '../auth/interface';
import { Status } from '../common/enums';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentCycleRO } from '../database/entities/recommitment/recommitment-cycle.ro';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { AppLogger } from '../logger/logger.service';
import { TemplateType, EmailTemplates } from '../mail/constants';
import { MailDto } from '../mail/mail.dto';
import { MailService } from '../mail/mail.service';
import {
  PersonnelRecommitmentDTO,
  UpdatePersonnelRecommitmentDTO,
} from '../personnel/dto/update-personnel-recommitment.dto';
import { PersonnelService } from '../personnel/personnel.service';
import { RecommitmentRO } from '../personnel/ro/recommitment.ro';

@Injectable()
export class RecommitmentService {
  constructor(
    @InjectRepository(RecommitmentEntity)
    private readonly recommitmentRepository: Repository<RecommitmentEntity>,
    @InjectRepository(RecommitmentCycleEntity)
    private readonly recommitmentCycleRepository: Repository<RecommitmentCycleEntity>,
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    @Inject(MailService) private readonly mailService: MailService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RecommitmentService.name);
  }

  /**
   * Updates the recommitment status of a member.
   * @param {string} id - The ID of the member.
   * @param {PersonnelRecommitmentDTO} recommitmentUpdate - The recommitment update data.
   * @param {RequestWithRoles} req - The request object containing roles.
   * @returns {Promise<PersonnelEntity>} - The updated personnel entity.
   */
  async updateMemberRecommitmentStatus(
    id: string,
    recommitmentUpdate: PersonnelRecommitmentDTO,
    req: RequestWithRoles,
  ): Promise<PersonnelEntity> {
    const programsToUpdate = Object.keys(recommitmentUpdate);

    for (const key of programsToUpdate) {
      const recommitment = await this.recommitmentRepository.findOneOrFail({
        where: {
          personnelId: id,
          recommitmentCycleId: recommitmentUpdate[key].year,
          program: recommitmentUpdate[key].program,
        },
      });

      // If update request ius sent by the member, log the member decision date, otherwise log the supervisor decision date.
      if (req.idir === id) {
        recommitment.memberDecisionDate = new Date();
      } else {
        recommitment.supervisorDecisionDate = new Date();
      }

      // call update by passing in the composite key + new status
      await this.recommitmentRepository.update(
        {
          personnelId: id,
          recommitmentCycleId: recommitmentUpdate[key].year,
          program: recommitmentUpdate[key].program,
        },
        {
          ...recommitment,
          status: recommitmentUpdate[key].status,
        },
      );
    }

    return await this.personnelService.findOne(id);
  }
  /**
   * Send email after a trigger (ie: member accepted, supervisor denied, etc)
   * @param id
   * @param recommitmentUpdate
   * @param key
   */
  async triggerEmailNotification(
    id: string,
    recommitmentUpdate: UpdatePersonnelRecommitmentDTO,
    key: Program,
  ): Promise<void> {
    const personnel = await this.recommitmentRepository.findOneOrFail({
      where: { personnelId: id },
    });

    switch (recommitmentUpdate[key].status) {
      case RecommitmentStatus.MEMBER_COMMITTED:
        await this.mailService.generateAndSendTemplate(
          EmailTemplates.SUPERVISOR_REQUEST,
          TemplateType.SUPERVISOR,
          [personnel.toResponseObject([Role.SUPERVISOR])],
          recommitmentUpdate[key].program,
        );
        break;
      case RecommitmentStatus.MEMBER_DENIED:
        await this.mailService.generateAndSendTemplate(
          EmailTemplates.MEMBER_DECLINED,
          TemplateType.MEMBER,
          [personnel.toResponseObject([Role.MEMBER])],
          recommitmentUpdate[key].program,
        );
        break;
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        await this.mailService.generateAndSendTemplate(
          EmailTemplates.MEMBER_APPROVED,
          TemplateType.MEMBER,
          [personnel.toResponseObject([Role.MEMBER])],
          recommitmentUpdate[key].program,
        );
        break;
      case RecommitmentStatus.SUPERVISOR_DENIED:
        await this.mailService.generateAndSendTemplate(
          EmailTemplates.MEMBER_DENIED,
          TemplateType.MEMBER,
          [personnel.toResponseObject([Role.MEMBER])],
          recommitmentUpdate[key].program,
        );
        break;
    }
  }

  /**
   * Checks if the current date is within the recommitment period.
   * @returns {Promise<RecommitmentCycleRO>} - The recommitment cycle information.
   */
  async checkRecommitmentPeriod(): Promise<RecommitmentCycleRO> {
    const qb = this.recommitmentCycleRepository.createQueryBuilder();
    qb.where('start_date <= :date', { date: new Date() });
    qb.andWhere('end_date >= :date', { date: new Date() });
    return await qb.getOne();
  }

  /**
   * Generates email templates for members and supervisors.
   * @returns {Promise<{ personnel: PersonnelEntity[], memberTemplate: MailDto, supervisorTemplate: MailDto }>}
   */
  async generateBulkAnnualTemplates(): Promise<{
    memberTemplate: MailDto;
    supervisorTemplate: MailDto;
  }> {
    const qb = this.recommitmentRepository.createQueryBuilder('recommitment');
    qb.leftJoinAndSelect('recommitment.personnel', 'personnel').where(
      'personnel.status = :status',
      { status: Status.ACTIVE },
    );
    const personnel = await qb.getMany();
    const rec = personnel.map((itm) => itm.toResponseObject([Role.MEMBER]));
    const memberTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_ANNUAL,
      TemplateType.MEMBER,
      rec,
    );

    this.logger.log(
      `Generated ${memberTemplate.contexts.length} member annual reminder emails`,
    );

    const supervisorTemplate = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_ANNUAL,
      TemplateType.SUPERVISOR,
      rec,
    );

    this.logger.log(
      `Generated ${supervisorTemplate.contexts.length} supervisor annual reminder emails`,
    );

    return {
      memberTemplate,
      supervisorTemplate,
    };
  }

  /**
   * Initiates the recommitment process for all active personnel.
   * @returns {Promise<void>}
   */
  async handleStartRecommitment(): Promise<void> {
    const cycle = await this.recommitmentCycleRepository.save(
      new RecommitmentCycleEntity(),
    );

    this.logger.log(`RECOMMITMENT CYCLE: ${cycle.year}`);

    const personnel = await this.personnelService.findActivePersonnel();

    for (const person of personnel) {
      if (person.emcr) {
        await this.recommitmentRepository.save(
          this.recommitmentRepository.create({
            personnelId: person.id,
            recommitmentCycleId: cycle.year,
            status: RecommitmentStatus.PENDING,
            memberDecisionDate: null,
            supervisorIdir: null,
            supervisorDecisionDate: null,
            program: Program.EMCR,
          }),
        );
      }

      if (person.bcws) {
        await this.recommitmentRepository.save(
          this.recommitmentRepository.create({
            personnelId: person.id,
            recommitmentCycleId: cycle.year,
            status: RecommitmentStatus.PENDING,
            memberDecisionDate: null,
            supervisorIdir: null,
            supervisorDecisionDate: null,
            program: Program.BCWS,
          }),
        );
      }
    }

    this.logger.log(`Initiated Recommitment for: ${personnel.length} members`);
  }

  async generateBulkReminderEmails(): Promise<{
    pendingMembersTemplate: MailDto;
    committedMembersTemplate: MailDto;
  }> {
    const qb = this.recommitmentRepository.createQueryBuilder('recommitment');
    qb.leftJoinAndSelect('recommitment.personnel', 'personnel').where(
      'personnel.status = :status',
      { status: Status.ACTIVE },
    );

    const pendingMembersQB = qb.where('recommitment.status = :status', {
      status: RecommitmentStatus.PENDING,
    });
    const committedMembersQB = qb.where('recommitment.status = :status', {
      status: RecommitmentStatus.MEMBER_COMMITTED,
    });

    const pendingMembers = await pendingMembersQB.getMany();
    const committedMembers = await committedMembersQB.getMany();

    const committedMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      committedMembers.map((itm) =>
        itm.toResponseObject([Role.SUPERVISOR, Role.MEMBER]),
      ),
    );

    const pendingMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_FOLLOW_UP,
      TemplateType.MEMBER,
      pendingMembers.map((itm) =>
        itm.toResponseObject([Role.SUPERVISOR, Role.MEMBER]),
      ),
    );

    this.logger.log(
      `Generated ${committedMembersTemplate.contexts.length} emails for committed members supervisors`,
    );

    return {
      pendingMembersTemplate,
      committedMembersTemplate,
    };
  }

  /**
   * Ends the recommitment process and updates the status of members who did not respond.
   * @returns {Promise<void>}
   */
  async handleEndRecommitment(): Promise<MailDto> {
    const {
      memberNoResponseBcws,
      memberNoResponseEmcr,
      supervisorNoResponseBCWS,
      supervisorNoResponseEMCR,
    } = await this.findStillPendingAndCommitedMembers();

    for (const records of [
      ...memberNoResponseBcws,
      ...supervisorNoResponseBCWS,
    ]) {
      records.recommitment.personnel.bcws.status = Status.INACTIVE;
      await this.personnelService.save(records.recommitment.personnel);
    }

    for (const records of [
      ...memberNoResponseEmcr,
      ...supervisorNoResponseEMCR,
    ]) {
      records.recommitment.personnel.emcr.status = Status.INACTIVE;
      await this.personnelService.save(records.recommitment.personnel);
    }

    return this.mailService.generateTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      [...memberNoResponseBcws, ...memberNoResponseEmcr],
    );
  }

  /**
   * Finds members who are still pending in the recommitment process.
   */
  async findStillPendingAndCommitedMembers(): Promise<{
    memberNoResponseBcws: Record<string, RecommitmentRO>[];
    memberNoResponseEmcr: Record<string, RecommitmentRO>[];
    supervisorNoResponseBCWS: Record<string, RecommitmentRO>[];
    supervisorNoResponseEMCR: Record<string, RecommitmentRO>[];
  }> {
    const qb = this.recommitmentRepository
      .createQueryBuilder('personnel')
      .leftJoinAndSelect('personnel.recommitment', 'recommitment')
      .where('personnel.status = :status', { status: Status.ACTIVE });

    const memberNoResponseEmcrQb = qb
      .where('recommitment.status = :status', {
        status: RecommitmentStatus.PENDING,
      })
      .andWhere('recommitment.program = :program', { program: Program.EMCR });
    const memberNoResponseBcwsQb = qb
      .where('recommitment.status = :status', {
        status: RecommitmentStatus.PENDING,
      })
      .andWhere('recommitment.program = :program', { program: Program.BCWS });

    const supervisorNoResponseEmcrQb = qb
      .where('recommitment.status = :status', {
        status: RecommitmentStatus.MEMBER_COMMITTED,
      })
      .andWhere('recommitment.program = :program', { program: Program.EMCR });
    const supervisorNoResponseBcwsQb = qb
      .where('recommitment.status = :status', {
        status: RecommitmentStatus.MEMBER_COMMITTED,
      })
      .andWhere('recommitment.program = :program', { program: Program.BCWS });

    const memberNoResponseBcws = await memberNoResponseBcwsQb.getMany();
    const memberNoResponseEmcr = await memberNoResponseEmcrQb.getMany();
    const supervisorNoResponseBCWS = await supervisorNoResponseBcwsQb.getMany();
    const supervisorNoResponseEMCR = await supervisorNoResponseEmcrQb.getMany();

    return {
      memberNoResponseBcws: memberNoResponseBcws.map((itm) =>
        itm.toResponseObject([
          Role.SUPERVISOR,
          Role.MEMBER,
          Role.COORDINATOR,
          Role.LOGISTICS,
        ]),
      ),
      memberNoResponseEmcr: memberNoResponseEmcr.map((itm) =>
        itm.toResponseObject([
          Role.SUPERVISOR,
          Role.MEMBER,
          Role.COORDINATOR,
          Role.LOGISTICS,
        ]),
      ),
      supervisorNoResponseBCWS: supervisorNoResponseBCWS.map((itm) =>
        itm.toResponseObject([
          Role.SUPERVISOR,
          Role.MEMBER,
          Role.COORDINATOR,
          Role.LOGISTICS,
        ]),
      ),
      supervisorNoResponseEMCR: supervisorNoResponseEMCR.map((itm) =>
        itm.toResponseObject([
          Role.SUPERVISOR,
          Role.MEMBER,
          Role.COORDINATOR,
          Role.LOGISTICS,
        ]),
      ),
    };
  }
}
