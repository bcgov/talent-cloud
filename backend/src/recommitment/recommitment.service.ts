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
    const personnel = await this.personnelService.findOne(id);

    for (const key of programsToUpdate) {
      const recommitment = await this.recommitmentRepository.findOneOrFail({
        where: {
          personnelId: id,
          recommitmentCycleId: recommitmentUpdate[key].year,
          program: recommitmentUpdate[key].program,
        },
      });

      // If update request is sent by the member, log the member decision date, otherwise log the supervisor decision date.
      if (req.idir === personnel.email) {
        recommitment.memberDecisionDate = new Date();
      } else if (req.idir === personnel.supervisorEmail) {
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
    const cycle = await this.recommitmentCycleRepository.findOne({
      where: { year: new Date().getFullYear() },
    });
    this.logger.log(cycle);
    return cycle;
  }

  /**
   * Initiates the recommitment process for all active personnel.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @param {string[]} [testEmail] - The test email address.
   * @returns {Promise<void>}
   */
  async handleStartRecommitment(
    dryRun: boolean = false,
    testEmail?: string[],
  ): Promise<{member: unknown, supervisor: unknown}> {
    const cycle = await this.recommitmentCycleRepository.findOne({
      where: { year: new Date().getFullYear() },
    });

    const { emcr, bcws } = await this.personnelService.findActivePersonnel();

    this.logger.log(`Found ${bcws.length} active BCWS personnel`);
    this.logger.log(`Found ${emcr.length} active EMCR personnel`);

    await this.saveRecommitmentEntities(emcr, cycle.year, Program.EMCR);
    await this.saveRecommitmentEntities(bcws, cycle.year, Program.BCWS);

    const recommitment = await this.recommitmentRepository.find({
      where: { recommitmentCycle: { year: cycle.year } },
      relations: ['personnel'],
    });

    const uniqueIds = Array.from(
      new Set(recommitment.map((itm) => itm.personnel.id)),
    );

    const uniqueSupervisors = Array.from(
      new Set(recommitment.map((itm) => itm.personnel.supervisorEmail)),
    );

    const recommitmentRO = recommitment.map((itm) => itm.toResponseObject());

    const memberTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_ANNUAL,
      TemplateType.MEMBER,
      uniqueIds.map(itm => recommitmentRO.find(r => r.personnel.id === itm)),
      cycle.endDate,
    );

    this.logger.log(
      `Generated ${memberTemplate.contexts.length} member annual reminder emails`,
    );

    const supervisorTemplate = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_ANNUAL,
      TemplateType.SUPERVISOR,
      uniqueSupervisors.map(itm => recommitmentRO.find(r => r.personnel.supervisorEmail === itm)),
      
      cycle.endDate,
    );

    this.logger.log(
      `Generated ${supervisorTemplate.contexts.length} supervisor annual reminder emails`,
    );

    if (dryRun) {
      memberTemplate.contexts = memberTemplate.contexts.filter((context) =>
        testEmail.find((email) => context.to.includes(email)), 
      );
      supervisorTemplate.contexts = supervisorTemplate.contexts.filter(
        (context) => testEmail.find((email) => context.to.includes(email)), 
      );
    }
    return {
      member: await this.mailService.sendMail(memberTemplate), 
      supervisor: await this.mailService.sendMail(supervisorTemplate)
    }
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
    testEmail?: string[],
  ): Promise<{members: unknown, supervisors: unknown}> {
    const recommitmentCycle = await this.checkRecommitmentPeriod();

    const { memberPending, memberCommitted } =
      await this.findMembersByRecommitmentStatus();

    const uniquePendingMemberIds = Array.from(
      new Set(memberPending.map((itm) => itm.personnel.id)),
    );

    const uniqueSupervisorEmails = Array.from(
      new Set(memberCommitted.map((itm) => itm.personnel.supervisorEmail)),
    );

    const uniquePendingMembers = uniquePendingMemberIds.map((itm) =>
      memberPending.find((r) => r.personnel.id === itm),
    );

    const uniqueCommittedMembers = uniqueSupervisorEmails.map((itm) =>
      memberCommitted.find((r) => r.personnel.supervisorEmail === itm),
    );

    this.logger.log(
      `Found ${uniquePendingMembers.length} pending members (waiting for member response)`,
    );

    this.logger.log(
      `Found ${uniqueCommittedMembers.length} committed members (waiting for supervisor response)`,
    );

    const pendingMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_FOLLOW_UP,
      TemplateType.MEMBER,
      uniquePendingMembers,
      recommitmentCycle.endDate,
    );

    this.logger.log(
      `Generated ${pendingMembersTemplate.contexts.length} emails for pending members`,
    );

    const committedMembersTemplate = this.mailService.generateTemplate(
      EmailTemplates.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      uniqueCommittedMembers,
      recommitmentCycle.endDate,
    );

    this.logger.log(
      `Generated ${committedMembersTemplate.contexts.length} emails for supervisors of committed members`,
    );

    if (dryRun) {
      this.logger.log('TEST RUN: Emails will only be sent to test email');

      this.logger.log('Generated emails for pending members:');
      pendingMembersTemplate.contexts.forEach((template) =>
        this.logger.log(template.to),
      );

      this.logger.log('Generated emails for committed BCWS members:');
      committedMembersTemplate.contexts.forEach((template) =>
        this.logger.log(template.to),
      );

      pendingMembersTemplate.contexts = pendingMembersTemplate.contexts.filter(
        (context) => testEmail.find((email) => context.to.includes(email)), 
      );
      committedMembersTemplate.contexts =
        committedMembersTemplate.contexts.filter((context) =>
          testEmail.find((email) => context.to.includes(email)), 
        );
    }
    return {
      members: await this.mailService.sendMail(pendingMembersTemplate), 
      supervisors: await this.mailService.sendMail(committedMembersTemplate)
    }}

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
    const { memberPending, memberCommitted, memberDeclined, supervisorDenied } =
      await this.findMembersByRecommitmentStatus();

    const recommitmentCycle = await this.checkRecommitmentPeriod();

    if (!dryRun) {
      await this.updatePersonnelStatus(
        memberPending,
        memberCommitted,
        memberDeclined,
        supervisorDenied,
      );
    }

    const uniqueMemberIds = [...memberCommitted, ...memberPending].map(
      (itm) => itm.personnel.id,
    );

    const memberNoResponseEmails = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      memberPending.filter((itm) => uniqueMemberIds.includes(itm.personnel.id)),
      recommitmentCycle?.endDate,
    );

    // TODO change this to use new template
    const supervisorNoResponseEmails = this.mailService.generateTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      memberCommitted.filter((itm) =>
        uniqueMemberIds.includes(itm.personnel.id),
      ),
      recommitmentCycle?.endDate,
    );

    if (dryRun) {
      this.logger.log('TEST RUN: Emails will only be sent to test email');
      memberNoResponseEmails.contexts = [
        memberNoResponseEmails.contexts.find((context) =>
          context.to.includes(testEmail),
        ),
      ];

      supervisorNoResponseEmails.contexts = [
        supervisorNoResponseEmails.contexts.find((context) =>
          context.to.includes(testEmail),
        ),
      ];

      memberNoResponseEmails?.contexts?.forEach((context) =>
        this.logger.log(context?.to ?? "no member no response emails"),
      );
      supervisorNoResponseEmails?.contexts?.forEach((context) =>
        this.logger.log(context?.to ?? "no supervisor no response emails"),
      );
    }
    try {
      memberNoResponseEmails.contexts.length > 0 && await this.mailService.sendMail(memberNoResponseEmails);
      supervisorNoResponseEmails.contexts.length > 0 && await this.mailService.sendMail(supervisorNoResponseEmails);
    } catch (e) {
      this.logger.error(e);
    }
  }

  /**
   * Updates the status of personnel based on their recommitment status.
   * @param {RecommitmentRO[]} memberPending - The pending members.
   * @param {RecommitmentRO[]} memberCommittedBCWS - The committed BCWS members.
   * @param {RecommitmentRO[]} memberCommittedEMCR - The committed EMCR members.
   */
  private async updatePersonnelStatus(
    memberPending: RecommitmentRO[],
    memberCommitted: RecommitmentRO[],
    memberDeclined: RecommitmentRO[],
    supervisorDenied: RecommitmentRO[],
  ): Promise<void> {
    for (const recommitment of [...memberPending]) {
      await this.recommitmentRepository.update(recommitment.personnelId, {
        status: RecommitmentStatus.MEMBER_NO_RESPONSE,
      });
    }

    for (const recommitment of [...memberCommitted]) {
      await this.recommitmentRepository.update(recommitment.personnelId, {
        status: RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
      });
    }

    const membersToInactive = [
      ...memberPending,
      ...memberCommitted,
      ...memberDeclined,
      ...supervisorDenied,
    ];

    for (const recommitment of [
      ...membersToInactive.filter((itm) => itm.program === Program.BCWS),
    ]) {
      recommitment.personnel.bcws.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }

    for (const recommitment of [
      ...membersToInactive.filter((itm) => itm.program === Program.EMCR),
    ]) {
      recommitment.personnel.emcr.status = Status.INACTIVE;
      await this.personnelService.save(recommitment.personnel);
    }
  }

  /**
   * Finds members who are still pending in the recommitment process.
   * @returns {Promise<{ memberPending: RecommitmentRO[]; memberCommittedBCWS: RecommitmentRO[]; memberCommittedEMCR: RecommitmentRO[] }>}
   */
  async findMembersByRecommitmentStatus(): Promise<{
    memberPending: RecommitmentRO[];
    memberCommitted: RecommitmentRO[];
    memberDeclined: RecommitmentRO[];
    supervisorDenied: RecommitmentRO[];
  }> {
    const members = await this.recommitmentRepository.find({
      where: { recommitmentCycle: { year: new Date().getFullYear() } },
      relations: ['personnel', 'recommitmentCycle'],
    });

    const membersRo = members.map((itm) => itm.toResponseObject());

    return {
      memberPending: membersRo.filter(
        (itm) => itm.status === RecommitmentStatus.PENDING,
      ),
      memberCommitted: membersRo.filter(
        (itm) => itm.status === RecommitmentStatus.MEMBER_COMMITTED,
      ),
      memberDeclined: membersRo.filter(
        (itm) => itm.status === RecommitmentStatus.MEMBER_DENIED,
      ),
      supervisorDenied: membersRo.filter(
        (itm) => itm.status === RecommitmentStatus.SUPERVISOR_DENIED,
      ),
    };
  }
}
