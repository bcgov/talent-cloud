import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program, RequestWithRoles } from '../auth/interface';
import { BcwsService } from '../bcws/bcws.service';
import { Status } from '../common/enums';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentCycleRO } from '../database/entities/recommitment/recommitment-cycle.ro';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { EmcrService } from '../emcr/emcr.service';
import { AppLogger } from '../logger/logger.service';
import { TemplateType, EmailTags } from '../mail/constants';
import { MailDto } from '../mail/mail.dto';
import { MailRO } from '../mail/mail.ro';
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
    @Inject(BcwsService)
    private readonly bcwsService: BcwsService,
    @Inject(EmcrService)
    private readonly emcrService: EmcrService,
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
    const programsToUpdate = Object.keys(recommitmentUpdate).filter((key) =>
      [Program.BCWS, Program.EMCR].includes(key as Program),
    );
    const personnel = await this.personnelService.findOne(id);

    if (recommitmentUpdate.supervisorInformation) {
      await this.personnelService.updatePersonnelSupervisorInformation(
        personnel,
        {
          supervisorEmail: recommitmentUpdate.supervisorInformation.email,
          supervisorFirstName:
            recommitmentUpdate.supervisorInformation.firstName,
          supervisorLastName: recommitmentUpdate.supervisorInformation.lastName,
          supervisorPhone: recommitmentUpdate.supervisorInformation.phone,
        },
      );
    }

    for (const key of programsToUpdate) {
      const recommitment = await this.recommitmentRepository.findOne({
        where: {
          personnel: { id },
          recommitmentCycle: { year: recommitmentUpdate[key].year },
          program: recommitmentUpdate[key].program,
        },
        relations: ['personnel', 'recommitmentCycle'],
      });

      // If update request is sent by the member, log the member decision date, otherwise log the supervisor decision date.
      if (
        [
          RecommitmentStatus.MEMBER_COMMITTED,
          RecommitmentStatus.MEMBER_DENIED,
        ].includes(recommitmentUpdate[key].status)
      ) {
        recommitmentUpdate[key].memberDecisionDate = new Date();
      } else if (
        [
          RecommitmentStatus.SUPERVISOR_APPROVED,
          RecommitmentStatus.SUPERVISOR_DENIED,
        ].includes(recommitmentUpdate[key].status)
      ) {
        recommitmentUpdate[key].supervisorDecisionDate = new Date();
        recommitmentUpdate[key].supervisorIdir = req.idir;
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
          supervisorIdir: recommitmentUpdate[key]?.supervisorIdir,
          supervisorDecisionDate:
            recommitmentUpdate[key].supervisorDecisionDate,
          memberDecisionDate: recommitmentUpdate[key].memberDecisionDate,
          memberReason:
            recommitmentUpdate[key]?.memberReason?.replace(',', '') ?? '',
          supervisorReason: recommitmentUpdate[key]?.supervisorReason ?? '',
          status: recommitmentUpdate[key]?.status,
        },
      );
      // If recomitted to both, only send one email to supervisor
      if (
        recommitmentUpdate?.bcws?.status ===
          RecommitmentStatus.MEMBER_COMMITTED &&
        recommitmentUpdate?.emcr?.status === RecommitmentStatus.MEMBER_COMMITTED
      ) {
        this.logger.log(
          `${recommitment[key]?.status} ${recommitment[key]?.program} ${recommitment[key]?.personnel.id}`,
        );
      } else {
        this.triggerEmailNotification(id, recommitmentUpdate[key]);
      }
    }
    if (
      recommitmentUpdate?.bcws?.status ===
        RecommitmentStatus.MEMBER_COMMITTED &&
      recommitmentUpdate?.emcr?.status === RecommitmentStatus.MEMBER_COMMITTED
    ) {
      this.triggerEmailNotification(id, {
        year: new Date().getFullYear(),
        status: RecommitmentStatus.MEMBER_COMMITTED,
        program: Program.ALL,
      });
    }

    return await this.personnelService.findOne(id);
  }
  filterRecommitmentList(
    recommitment: RecommitmentEntity[],
    testEmail?: string[],
    dryRun?: boolean,
  ): { memberList: RecommitmentRO[]; supervisorList: RecommitmentRO[] } {
    const uniqueIds = Array.from(
      new Set(recommitment.map((itm) => itm.personnel.id)),
    );

    const uniqueSupervisors = Array.from(
      new Set(recommitment.map((itm) => itm.personnel.supervisorEmail)),
    );

    const recommitmentRO = recommitment.map((itm) => itm.toResponseObject());

    const memberList = uniqueIds.map((itm) =>
      recommitmentRO.find((r) => r.personnel.id === itm),
    );

    const testList = memberList.filter(
      (itm) => testEmail?.find((r) => itm.personnel.email === r),
    );

    const supervisorList = uniqueSupervisors.map((itm) =>
      recommitmentRO.find((r) => r.personnel.supervisorEmail === itm),
    );

    const testSupervisorList = supervisorList.filter(
      (itm) => testEmail?.find((r) => itm.personnel.supervisorEmail === r),
    );

    return {
      memberList: dryRun ? testList : memberList,
      supervisorList: dryRun ? testSupervisorList : supervisorList,
    };
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
    this.logger.log(recommitmentUpdate);
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
          EmailTags.SUPERVISOR_REQUEST,
          TemplateType.SUPERVISOR,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.MEMBER_DENIED:
        return this.mailService.generateTemplate(
          EmailTags.MEMBER_DECLINED,
          TemplateType.MEMBER,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return this.mailService.generateTemplate(
          EmailTags.MEMBER_APPROVED,
          TemplateType.MEMBER,
          [personnel.toResponseObject()],
          endDate,
          program,
        );
      case RecommitmentStatus.SUPERVISOR_DENIED:
        return this.mailService.generateTemplate(
          EmailTags.MEMBER_DENIED_BY_SUPERVISOR,
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
   * Splits the list of emails into groups of 30.
   * @param list
   * @returns
   */
  private chunkEmails(list: unknown[]): RecommitmentRO[][] {
    const maxContexts = 30;
    return Object.values(
      list.reduce((splitList, item, index) => {
        const groupIndex = Math.floor(index / maxContexts);

        if (!splitList[groupIndex]) {
          splitList[groupIndex] = [];
        }
        splitList[groupIndex].push(item);

        return splitList;
      }, []),
    );
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
    ministry?: string,
  ): Promise<{ member: MailRO; supervisor: MailRO }> {
    const cycle = await this.recommitmentCycleRepository.findOne({
      where: { year: new Date().getFullYear() },
    });

    const recommitmentQb =
      this.recommitmentRepository.createQueryBuilder('recommitment');
    recommitmentQb.leftJoinAndSelect('recommitment.personnel', 'personnel');
    recommitmentQb.leftJoinAndSelect(
      'recommitment.recommitmentCycle',
      'recommitmentCycle',
      'recommitmentCycle.year = :year',
      { year: cycle.year },
    );
    if (!!ministry) {
      recommitmentQb.andWhere('personnel.ministry = :ministry', { ministry });
    }
    const recommitment = await recommitmentQb.getMany();

    const { memberList, supervisorList } = this.filterRecommitmentList(
      recommitment,
      testEmail,
      dryRun,
    );
    this.logger.log(`Found: ${memberList.length} Members`, 'Member Annual');
    this.logger.log(
      `Found: ${supervisorList.length} Supervisors`,
      'Supervisor Annual',
    );

    const memberListGroups = this.chunkEmails(memberList);
    const supervisorListGroups = this.chunkEmails(supervisorList);

    const memberTemplates = memberListGroups.map((itm) =>
      this.mailService.generateTemplate(
        EmailTags.MEMBER_ANNUAL,
        TemplateType.MEMBER,
        itm,
        cycle.endDate,
        Program.ALL,
        ministry,
      ),
    );

    const supervisorTemplates = supervisorListGroups.map((itm) =>
      this.mailService.generateTemplate(
        EmailTags.SUPERVISOR_ANNUAL,
        TemplateType.SUPERVISOR,
        itm,
        cycle.endDate,
        Program.ALL,
        ministry,
      ),
    );

    for await (const template of memberTemplates) {
      await this.mailService.sendMail(template);
    }

    for await (const template of supervisorTemplates) {
      await this.mailService.sendMail(template);
    }

    return;
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
  ): Promise<{ member: MailRO; supervisor: MailRO }> {
    const recommitmentCycle = await this.checkRecommitmentPeriod();

    const { memberPending, memberCommitted } =
      await this.findMembersByRecommitmentStatus();
    const { memberList } = this.filterRecommitmentList(
      memberPending,
      testEmail,
      dryRun,
    );
    const { supervisorList } = this.filterRecommitmentList(
      memberCommitted,
      testEmail,
      dryRun,
    );

    const pendingMembersTemplate = this.mailService.generateTemplate(
      EmailTags.MEMBER_FOLLOW_UP,
      TemplateType.MEMBER,
      memberList,
      recommitmentCycle.endDate,
      Program.ALL,
    );

    this.logger.log(
      `Generated ${pendingMembersTemplate.contexts.length} emails for pending members`,
    );

    const committedMembersTemplate = this.mailService.generateTemplate(
      EmailTags.SUPERVISOR_REMINDER,
      TemplateType.SUPERVISOR,
      supervisorList,
      recommitmentCycle.endDate,
      Program.ALL,
    );

    this.logger.log(
      `Generated ${committedMembersTemplate.contexts.length} emails for supervisors of committed members`,
    );

    return {
      member: await this.mailService.sendMail(pendingMembersTemplate),
      supervisor: await this.mailService.sendMail(committedMembersTemplate),
    };
  }

  /**
   * Ends the recommitment process and updates the status of members who did not respond.
   * @param {boolean} dryRun - If true, the process will not make any changes.
   * @param {string} [testEmail] - The test email address.
   * @returns {Promise<void>}
   */
  async handleEndRecommitment(
    dryRun: boolean = false,
    testEmail?: string[],
  ): Promise<{ member: MailRO; supervisor: MailRO }> {
    const { memberPending, memberCommitted, memberDeclined, supervisorDenied } =
      await this.findMembersByRecommitmentStatus();

    const recommitmentCycle = await this.checkRecommitmentPeriod();

    if (!dryRun) {
      await this.updatePersonnelStatus(
        memberPending.map((itm) => itm.toResponseObject()),
        memberCommitted.map((itm) => itm.toResponseObject()),
        memberDeclined.map((itm) => itm.toResponseObject()),
        supervisorDenied.map((itm) => itm.toResponseObject()),
      );
    }

    const pendingMembers = this.filterRecommitmentList(
      memberPending,
      testEmail,
      dryRun,
    );
    const memberCommittedList = this.filterRecommitmentList(
      memberCommitted,
      testEmail,
      dryRun,
    );

    const memberNoResponseEmails = this.mailService.generateTemplate(
      EmailTags.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      pendingMembers.memberList,
      recommitmentCycle?.endDate,
    );

    // TODO change this to use new template
    const supervisorNoResponseEmails = this.mailService.generateTemplate(
      EmailTags.MEMBER_SUPERVISOR_NO_RESPONSE,
      TemplateType.MEMBER,
      memberCommittedList.memberList,
      recommitmentCycle?.endDate,
    );
    try {
      return {
        member: await this.mailService.sendMail(memberNoResponseEmails),
        supervisor: await this.mailService.sendMail(supervisorNoResponseEmails),
      };
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
    const membersToInactive = [
      ...memberPending,
      ...memberCommitted,
      ...memberDeclined,
      ...supervisorDenied,
    ];

    for await (const recommitment of [
      ...membersToInactive.filter((itm) => itm.program === Program.BCWS),
    ]) {
      await this.bcwsService.updatePersonnelAfterRecommitment(
        recommitment.personnel.id,
        Status.INACTIVE,
      );
    }

    for await (const recommitment of [
      ...membersToInactive.filter((itm) => itm.program === Program.EMCR),
    ]) {
      await this.emcrService.updatePersonnelAfterRecommitment(
        recommitment.personnel.id,
        Status.INACTIVE,
      );
    }

    for await (const recommitment of [...memberPending]) {
      await this.recommitmentRepository.update(
        {
          personnelId: recommitment.personnelId,
          recommitmentCycleId: recommitment.year,
          program: recommitment.program,
        },
        {
          status: RecommitmentStatus.MEMBER_NO_RESPONSE,
        },
      );
    }

    for await (const recommitment of [...memberCommitted]) {
      await this.recommitmentRepository.update(
        {
          personnelId: recommitment.personnelId,
          recommitmentCycleId: recommitment.year,
          program: recommitment.program,
        },
        {
          status: RecommitmentStatus.SUPERVISOR_NO_RESPONSE,
        },
      );
    }
  }

  /**
   * Finds members who are still pending in the recommitment process.
   * @returns {Promise<{ memberPending: RecommitmentEntity[]; memberCommittedBCWS: RecommitmentEntity[]; memberCommittedEMCR: RecommitmentEntity[] }>}
   */
  async findMembersByRecommitmentStatus(): Promise<{
    memberPending: RecommitmentEntity[];
    memberCommitted: RecommitmentEntity[];
    memberDeclined: RecommitmentEntity[];
    supervisorDenied: RecommitmentEntity[];
  }> {
    const members = await this.recommitmentRepository.find({
      where: { recommitmentCycle: { year: new Date().getFullYear() } },
      relations: ['personnel', 'recommitmentCycle'],
    });

    return {
      memberPending: members.filter(
        (itm) => itm.status === RecommitmentStatus.PENDING,
      ),
      memberCommitted: members.filter(
        (itm) => itm.status === RecommitmentStatus.MEMBER_COMMITTED,
      ),
      memberDeclined: members.filter(
        (itm) => itm.status === RecommitmentStatus.MEMBER_DENIED,
      ),
      supervisorDenied: members.filter(
        (itm) => itm.status === RecommitmentStatus.SUPERVISOR_DENIED,
      ),
    };
  }
}
