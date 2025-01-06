import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program, RequestWithRoles } from '../auth/interface';
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
      this.triggerEmailNotification(id, recommitmentUpdate[key]);
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
  ): Promise<void> {
    const personnel = await this.recommitmentRepository.findOneOrFail({
      where: { personnelId: id },
      relations: ['personnel'],
    });
    const recommitmentCycle = await this.checkRecommitmentPeriod();
    switch (recommitmentUpdate.status) {
      case RecommitmentStatus.MEMBER_COMMITTED:
        return await this.mailService.sendMail(
          this.mailService.generateTemplate(
            EmailTemplates.SUPERVISOR_REQUEST,
            TemplateType.SUPERVISOR,
            [personnel.toResponseObject()],
            recommitmentCycle.endDate,
            recommitmentUpdate.program,
          ),
        );

      case RecommitmentStatus.MEMBER_DENIED:
        return await this.mailService.sendMail(
          this.mailService.generateTemplate(
            EmailTemplates.MEMBER_DECLINED,
            TemplateType.MEMBER,
            [personnel.toResponseObject()],
            recommitmentCycle.endDate,
            recommitmentUpdate.program,
          ),
        );
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return await this.mailService.sendMail(
          this.mailService.generateTemplate(
            EmailTemplates.MEMBER_APPROVED,
            TemplateType.MEMBER,
            [personnel.toResponseObject()],
            recommitmentCycle.endDate,
            recommitmentUpdate.program,
          ),
        );

      case RecommitmentStatus.SUPERVISOR_DENIED:
        return await this.mailService.sendMail(
          this.mailService.generateTemplate(
            EmailTemplates.MEMBER_DENIED,
            TemplateType.MEMBER,
            [personnel.toResponseObject()],
            recommitmentCycle.endDate,
            recommitmentUpdate.program,
          ),
        );
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

    qb.leftJoinAndSelect('recommitment.personnel', 'personnel')
      .leftJoinAndSelect('personnel.emcr', 'emcr')
      .leftJoinAndSelect('personnel.bcws', 'bcws')
      .where('bcws.status = :status', { status: Status.ACTIVE })
      .orWhere('emcr.status = :status', { status: Status.ACTIVE });

    const recommitment = await qb.getMany();
    const uniqueIds = [...new Set(recommitment.map((itm) => itm.personnel.id))];
    const recommitmentRO = recommitment.map((itm) => itm.toResponseObject());
    const recommitmentCycle = await this.checkRecommitmentPeriod();

    const memberTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_ANNUAL,
      TemplateType.MEMBER,
      // Filter out duplicate personnel
      uniqueIds.map((itm) =>
        recommitmentRO.find((r) => r.personnel.id === itm),
      ),
      recommitmentCycle.endDate,
    );

    this.logger.log(
      `Generated ${memberTemplate.contexts.length} member annual reminder emails`,
    );

    const supervisorTemplate = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_ANNUAL,
      TemplateType.SUPERVISOR,
      uniqueIds.map((itm) =>
        recommitmentRO.find((r) => r.personnel.id === itm),
      ),
      recommitmentCycle.endDate,
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

    this.logger.log(`Found ${personnel.length} active personnel`);

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
    committedMembersTemplateEmcr: MailDto;
    committedMembersTemplateBcws: MailDto;
  }> {
    const recommitmentCycle = await this.checkRecommitmentPeriod();

    const pendingMembers = await this.recommitmentRepository.find({
      where: { status: RecommitmentStatus.PENDING },
      relations: ['recommitmentCycle', 'personnel'],
    });
    const uniquePendingMembers = [
      ...new Set(pendingMembers.map((itm) => itm.personnel.id)),
    ];

    const committedMembers = await this.recommitmentRepository.find({
      where: { status: RecommitmentStatus.MEMBER_COMMITTED },
      relations: ['recommitmentCycle', 'personnel'],
    });

    this.logger.log(
      `Found ${pendingMembers.length} pending members and ${committedMembers.length} committed members`,
    );

    const pendingMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_FOLLOW_UP,
      TemplateType.MEMBER,
      uniquePendingMembers.map((itm) =>
        pendingMembers.find((r) => r.personnel.id === itm).toResponseObject(),
      ),
      recommitmentCycle.endDate,
    );

    this.logger.log(
      `Generated ${pendingMembersTemplate.contexts.length} emails for pending members`,
    );

    const committedMembersTemplateBcws = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      committedMembers
        .filter((itm) => itm.program === Program.BCWS)
        .map((itm) => itm.toResponseObject()),
      recommitmentCycle.endDate,
      Program.BCWS,
    );
    const committedMembersTemplateEmcr = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      committedMembers
        .filter((itm) => itm.program === Program.EMCR)
        .map((itm) => itm.toResponseObject()),
      recommitmentCycle.endDate,
      Program.EMCR,
    );

    this.logger.log(
      `Generated ${
        committedMembersTemplateEmcr.contexts.length +
        committedMembersTemplateBcws.contexts.length
      } emails for committed members supervisors`,
    );

    return {
      pendingMembersTemplate,
      committedMembersTemplateEmcr,
      committedMembersTemplateBcws,
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
    const recommitmentCycle = await this.checkRecommitmentPeriod();
    for (const recommitment of [
      ...memberNoResponseBcws,
      ...supervisorNoResponseBCWS,
    ]) {
      recommitment.personnel.bcws.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }

    for (const recommitment of [
      ...memberNoResponseEmcr,
      ...supervisorNoResponseEMCR,
    ]) {
      recommitment.personnel.emcr.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }

    return this.mailService.generateTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      [...memberNoResponseBcws, ...memberNoResponseEmcr],
      recommitmentCycle.endDate,
    );
  }

  /**
   * Finds members who are still pending in the recommitment process.
   */
  async findStillPendingAndCommitedMembers(): Promise<{
    memberNoResponseBcws: RecommitmentRO[];
    memberNoResponseEmcr: RecommitmentRO[];
    supervisorNoResponseBCWS: RecommitmentRO[];
    supervisorNoResponseEMCR: RecommitmentRO[];
  }> {
    const qb = this.recommitmentRepository.createQueryBuilder('recommitment');

    qb.leftJoinAndSelect('recommitment.personnel', 'personnel')
      .leftJoinAndSelect('personnel.emcr', 'emcr')
      .leftJoinAndSelect('personnel.bcws', 'bcws')
      .where('bcws.status = :status', { status: Status.ACTIVE })
      .orWhere('emcr.status = :status', { status: Status.ACTIVE });

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
        itm.toResponseObject(),
      ),
      memberNoResponseEmcr: memberNoResponseEmcr.map((itm) =>
        itm.toResponseObject(),
      ),
      supervisorNoResponseBCWS: supervisorNoResponseBCWS.map((itm) =>
        itm.toResponseObject(),
      ),
      supervisorNoResponseEMCR: supervisorNoResponseEMCR.map((itm) =>
        itm.toResponseObject(),
      ),
    };
  }
}
