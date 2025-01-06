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

      // If update request is sent by the member, log the member decision date, otherwise log the supervisor decision date.
      if (req.idir === id) {
        recommitment.memberDecisionDate = new Date();
      } else {
        recommitment.supervisorDecisionDate = new Date();
      }

      // Update the recommitment status
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
   * Sends email after a trigger (e.g., member accepted, supervisor denied, etc).
   * @param {string} id - The ID of the member.
   * @param {UpdatePersonnelRecommitmentDTO} recommitmentUpdate - The recommitment update data.
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

    const emailTemplate = this.getEmailTemplate(
      recommitmentUpdate.status,
      personnel,
      recommitmentCycle.endDate,
      recommitmentUpdate.program,
    );
    if (emailTemplate) {
      await this.mailService.sendMail(emailTemplate);
    }
  }

  /**
   * Generates the appropriate email template based on the recommitment status.
   * @param {RecommitmentStatus} status - The recommitment status.
   * @param {PersonnelEntity} personnel - The personnel entity.
   * @param {Date} endDate - The end date of the recommitment cycle.
   * @param {Program} program - The program.
   * @returns {MailDto} - The generated email template.
   */
  private getEmailTemplate(
    status: RecommitmentStatus,
    personnel: RecommitmentEntity,
    endDate: Date,
    program: Program,
  ): MailDto {
    switch (status) {
      case RecommitmentStatus.MEMBER_COMMITTED:
        return this.mailService.generateTemplate(
          EmailTemplates.SUPERVISOR_REQUEST,
          TemplateType.SUPERVISOR,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.MEMBER_DENIED:
        return this.mailService.generateTemplate(
          EmailTemplates.MEMBER_DECLINED,
          TemplateType.MEMBER,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return this.mailService.generateTemplate(
          EmailTemplates.MEMBER_APPROVED,
          TemplateType.MEMBER,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.SUPERVISOR_DENIED:
        return this.mailService.generateTemplate(
          EmailTemplates.MEMBER_DENIED,
          TemplateType.MEMBER,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      default:
        return null;
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
   * Initiates the recommitment process for all active personnel.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @param {string} [testEmail] - The test email address.
   * @returns {Promise<void>}
   */
  async handleStartRecommitment(
    dryRun: boolean = false,
    testEmail?: string,
  ): Promise<void> {
    const cycle = await this.recommitmentCycleRepository.save(
      new RecommitmentCycleEntity(),
    );

    this.logger.log(`RECOMMITMENT CYCLE: ${cycle.year}`);

    const { emcr, bcws } = await this.personnelService.findActivePersonnel();

    this.logger.log(`Found ${bcws.length} active BCWS personnel`);
    this.logger.log(`Found ${emcr.length} active EMCR personnel`);

    await this.saveRecommitmentEntities(emcr, cycle.year, Program.EMCR);
    await this.saveRecommitmentEntities(bcws, cycle.year, Program.BCWS);

    const recommitment = await this.recommitmentRepository.find({
      where: { recommitmentCycle: { year: cycle.year } },
      relations: ['personnel'],
    });

    const uniqueIds = [...new Set(recommitment.map((itm) => itm.personnel.id))];
    const recommitmentRO = recommitment.map((itm) => itm.toResponseObject());

    const memberTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_ANNUAL,
      TemplateType.MEMBER,
      uniqueIds.map((itm) =>
        recommitmentRO.find((r) => r.personnel.id === itm),
      ),
      cycle.endDate,
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
      cycle.endDate,
    );

    this.logger.log(
      `Generated ${supervisorTemplate.contexts.length} supervisor annual reminder emails`,
    );

    if (dryRun) {
      memberTemplate.contexts = memberTemplate.contexts.filter((context) =>
        context.to.includes(testEmail),
      );
      supervisorTemplate.contexts = supervisorTemplate.contexts.filter(
        (context) => context.to.includes(testEmail),
      );
    }
    await this.mailService.sendMail(memberTemplate);
    await this.mailService.sendMail(supervisorTemplate);
  }

  /**
   * Saves recommitment entities for the given personnel.
   * @param {PersonnelEntity[]} personnel - The personnel array.
   * @param {number} year - The recommitment cycle year.
   * @param {Program} program - The program.
   */
  private async saveRecommitmentEntities(
    personnel: PersonnelEntity[],
    year: number,
    program: Program,
  ): Promise<void> {
    for (const person of personnel) {
      await this.recommitmentRepository.save(
        this.recommitmentRepository.create({
          personnelId: person.id,
          recommitmentCycleId: year,
          status: RecommitmentStatus.PENDING,
          memberDecisionDate: null,
          supervisorIdir: null,
          supervisorDecisionDate: null,
          program,
        }),
      );
    }
  }

  /**
   * Sends automated reminders to members and supervisors.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @param {string} [testEmail] - The test email address.
   * @returns {Promise<void>}
   */
  async handleSendAutomatedReminders(
    dryRun: boolean = false,
    testEmail?: string,
  ): Promise<void> {
    const recommitmentCycle = await this.checkRecommitmentPeriod();

    const { memberPending, memberCommittedBCWS, memberCommittedEMCR } =
      await this.findStillPendingAndCommitedMembers();
    const uniquePendingMembers = [
      ...new Set(memberPending.map((itm) => itm.personnel.id)),
    ];
    const membersCommitted = [...memberCommittedBCWS, ...memberCommittedEMCR];

    this.logger.log(
      `Found ${memberPending.length} pending members and ${membersCommitted.length} committed members`,
    );

    const pendingMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_FOLLOW_UP,
      TemplateType.MEMBER,
      uniquePendingMembers.map((itm) =>
        memberPending.find((r) => r.personnel.id === itm),
      ),
      recommitmentCycle.endDate,
    );

    this.logger.log(
      `Generated ${pendingMembersTemplate.contexts.length} emails for pending members`,
    );

    const committedMembersTemplateBcws = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      memberCommittedBCWS,
      recommitmentCycle.endDate,
      Program.BCWS,
    );

    const committedMembersTemplateEmcr = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      memberCommittedEMCR,
      recommitmentCycle.endDate,
      Program.EMCR,
    );

    this.logger.log(
      `Generated ${
        committedMembersTemplateEmcr.contexts.length +
        committedMembersTemplateBcws.contexts.length
      } emails for committed members supervisors`,
    );

    if (dryRun) {
      this.logger.log('Generated emails for pending members:');
      pendingMembersTemplate.contexts.forEach((template) =>
        this.logger.log(template.to),
      );

      this.logger.log('Generated emails for committed BCWS members:');
      committedMembersTemplateBcws.contexts.forEach((template) =>
        this.logger.log(template.to),
      );

      this.logger.log('Generated emails for committed EMCR members:');
      committedMembersTemplateEmcr.contexts.forEach((template) =>
        this.logger.log(template.to),
      );

      pendingMembersTemplate.contexts = pendingMembersTemplate.contexts.filter(
        (context) => context.to.includes(testEmail),
      );
      committedMembersTemplateEmcr.contexts =
        committedMembersTemplateEmcr.contexts.filter((context) =>
          context.to.includes(testEmail),
        );
      committedMembersTemplateBcws.contexts =
        committedMembersTemplateBcws.contexts.filter((context) =>
          context.to.includes(testEmail),
        );
    }
    await this.mailService.sendMail(pendingMembersTemplate);
    await this.mailService.sendMail(committedMembersTemplateEmcr);
    await this.mailService.sendMail(committedMembersTemplateBcws);
  }

  /**
   * Ends the recommitment process and updates the status of members who did not respond.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @param {string} [testEmail] - The test email address.
   * @returns {Promise<void>}
   */
  async handleEndRecommitment(
    dryRun: boolean = false,
    testEmail?: string,
  ): Promise<void> {
    const { memberPending, memberCommittedBCWS, memberCommittedEMCR } =
      await this.findStillPendingAndCommitedMembers();

    const recommitmentCycle = await this.checkRecommitmentPeriod();

    if (!dryRun) {
      await this.updatePersonnelStatus(
        memberPending,
        memberCommittedBCWS,
        memberCommittedEMCR,
      );
    }

    this.logger.log(
      `Set ${memberPending.length} members recommitment status to MEMBER_NO_RESPONSE`,
    );
    this.logger.log(
      `Set ${
        memberCommittedBCWS.length + memberCommittedEMCR.length
      } members recommitment status to SUPERVISOR_NO_RESPONSE`,
    );
    this.logger.log(
      `Set ${
        memberPending.length +
        memberCommittedBCWS.length +
        memberCommittedEMCR.length
      } members to INACTIVE`,
    );

    const finalEmails = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      memberPending,
      recommitmentCycle?.endDate,
    );

    if (dryRun) {
      finalEmails.contexts.forEach((context) => this.logger.log(context.to));

      finalEmails.contexts = [
        finalEmails.contexts.find((context) => context.to.includes(testEmail)),
      ];
    }

    await this.mailService.sendMail(finalEmails);
  }

  /**
   * Updates the status of personnel based on their recommitment status.
   * @param {RecommitmentRO[]} memberPending - The pending members.
   * @param {RecommitmentRO[]} memberCommittedBCWS - The committed BCWS members.
   * @param {RecommitmentRO[]} memberCommittedEMCR - The committed EMCR members.
   */
  private async updatePersonnelStatus(
    memberPending: RecommitmentRO[],
    memberCommittedBCWS: RecommitmentRO[],
    memberCommittedEMCR: RecommitmentRO[],
  ): Promise<void> {
    for (const recommitment of [
      ...memberPending.filter((itm) => itm.program === Program.BCWS),
      ...memberCommittedBCWS,
    ]) {
      recommitment.personnel.bcws.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }
    for (const recommitment of [
      ...memberPending.filter((itm) => itm.program === Program.EMCR),
      ...memberCommittedEMCR,
    ]) {
      recommitment.personnel.emcr.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }
    for (const recommitment of [...memberPending]) {
      await this.recommitmentRepository.update(recommitment.personnelId, {
        status: RecommitmentStatus.MEMBER_NO_RESPONSE,
      });
    }

    for (const recommitment of [
      ...memberCommittedBCWS,
      ...memberCommittedEMCR,
    ]) {
      await this.recommitmentRepository.update(recommitment.personnelId, {
        status: RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
      });
    }
  }

  /**
   * Finds members who are still pending in the recommitment process.
   * @returns {Promise<{ memberPending: RecommitmentRO[]; memberCommittedBCWS: RecommitmentRO[]; memberCommittedEMCR: RecommitmentRO[] }>}
   */
  async findStillPendingAndCommitedMembers(): Promise<{
    memberPending: RecommitmentRO[];
    memberCommittedBCWS: RecommitmentRO[];
    memberCommittedEMCR: RecommitmentRO[];
  }> {
    const memberPending = await this.recommitmentRepository.find({
      where: {
        status: RecommitmentStatus.PENDING,
      },
      relations: ['personnel', 'recommitmentCycle'],
    });

    const memberCommittedBCWS = await this.recommitmentRepository.find({
      where: {
        status: RecommitmentStatus.MEMBER_COMMITTED,
        program: Program.BCWS,
      },
      relations: ['personnel', 'recommitmentCycle'],
    });

    const memberCommittedEMCR = await this.recommitmentRepository.find({
      where: {
        status: RecommitmentStatus.MEMBER_COMMITTED,
        program: Program.EMCR,
      },
      relations: ['personnel', 'recommitmentCycle'],
    });

    return {
      memberPending: memberPending.map((itm) => itm.toResponseObject()),
      memberCommittedBCWS: memberCommittedBCWS.map((itm) =>
        itm.toResponseObject(),
      ),
      memberCommittedEMCR: memberCommittedEMCR.map((itm) =>
        itm.toResponseObject(),
      ),
    };
  }
}
