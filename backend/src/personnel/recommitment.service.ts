import { Inject, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { getWeekOfMonth } from 'date-fns';
import { In, Repository } from 'typeorm';
import { PersonnelService } from './personnel.service';
import { Program, RequestWithRoles } from '../auth/interface';
import { Status } from '../common/enums';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentCycleRO } from '../database/entities/recommitment/recommitment-cycle.ro';
import { AppLogger } from '../logger/logger.service';
import { PersonnelRecommitmentDTO } from './dto/update-personnel-recommitment.dto';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { TemplateType } from '../mail/constants';
import { EmailTemplates } from '../mail/constants';
import { MailService } from '../mail/mail.service';

export const RecommitmentCron = {
  EVERY_MONDAY_OF_JAN: '0 0 * 1 1',
  EVERY_MONDAY_OF_FEB: '0 0 * 2 1',
  EVERY_FRIDAY_OF_FEB: '0 0 * 2 5',
};

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
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.logger.setContext(RecommitmentService.name);
  }

  /**
   *
   * @param id Supervisor function to update recommitment status
   * @param recommitmentUpdate
   * @param req
   * @returns
   */
  async updateMemberRecommitmentStatus(
    id: string,
    recommitmentUpdate: PersonnelRecommitmentDTO,
    req: RequestWithRoles,
  ): Promise<PersonnelEntity> {
    Object.keys(recommitmentUpdate).forEach(async (key) => {
      const recommitment = await this.recommitmentRepository.findOneOrFail({
        where: {
          memberId: id,
          recommitmentCycleId: recommitmentUpdate[key].year,
          program: recommitmentUpdate[key].program,
        },
      });

      req.idir === id
        ? (recommitment.memberDecisionDate = new Date())
        : (recommitment.supervisorDecisionDate = new Date());
      await this.recommitmentRepository.update(
        {
          memberId: id,
          recommitmentCycleId: recommitmentUpdate[key].year,
          program: recommitmentUpdate[key].program,
        },
        { ...recommitment },
      );

      const personnel = await this.personnelService.findOne(id);

      switch (recommitmentUpdate[key].status) {
        case RecommitmentStatus.MEMBER_COMMITTED:
          await this.mailService.generateAndSendTemplate(
            EmailTemplates.SUPERVISOR_REQUEST,
            TemplateType.SUPERVISOR,
            [personnel],
            recommitmentUpdate[key].program,
          );
          break;
        case RecommitmentStatus.MEMBER_DECLINED:
          await this.mailService.generateAndSendTemplate(
            EmailTemplates.MEMBER_DECLINED,
            TemplateType.MEMBER,
            [personnel],
            recommitmentUpdate[key].program,
          );
          break;
        case RecommitmentStatus.SUPERVISOR_APPROVED:
          await this.mailService.generateAndSendTemplate(
            EmailTemplates.MEMBER_APPROVED,
            TemplateType.MEMBER,
            [personnel],
            recommitmentUpdate[key].program,
          );
          break;
        case RecommitmentStatus.SUPERVISOR_DENIED:
          await this.mailService.generateAndSendTemplate(
            EmailTemplates.MEMBER_DENIED,
            TemplateType.MEMBER,
            [personnel],
            recommitmentUpdate[key].program,
          );
          break;
      }
    });
    return await this.personnelService.findOne(id);
  }

  async triggerEmail(id, recommitmentUpdate) {
    const personnel = await this.personnelService.findOne(id);
    if (recommitmentUpdate.status === RecommitmentStatus.SUPERVISOR_APPROVED) {
      return await this.mailService.generateAndSendTemplate(
        EmailTemplates.MEMBER_APPROVED,
        TemplateType.MEMBER,
        recommitmentUpdate.program,
      );
    }
    if (recommitmentUpdate.status === RecommitmentStatus.SUPERVISOR_DENIED) {
      return await this.mailService.generateAndSendTemplate(
        EmailTemplates.MEMBER_DENIED,
        TemplateType.MEMBER,
        [personnel],
        recommitmentUpdate.program,
      );
    }
  }

  async getRecommitmentPeriod(): Promise<RecommitmentCycleRO> {
    const qb = this.recommitmentCycleRepository.createQueryBuilder();
    qb.where('start_date <= :date', { date: new Date() });
    qb.andWhere('end_date >= :date', { date: new Date() });
    return await qb.getOne();
  }

  async checkRecommitmentPeriod(): Promise<RecommitmentCycleRO> {
    const qb = this.recommitmentCycleRepository.createQueryBuilder();
    qb.where('start_date <= :date', { date: new Date() });
    qb.andWhere('end_date >= :date', { date: new Date() });
    return await qb.getOne();
  }

  async endRecommitmentCycle() {
    // const cycle = await this.getRecommitmentPeriod();
    //TODO set all final recommitment status's and emails
  }

  @Cron(RecommitmentCron.EVERY_MONDAY_OF_JAN, {
    name: 'januaryMondayCron',
  })
  async januaryMondayCron() {
    const week = getWeekOfMonth(new Date());
    if (week === 2) {
      this.logger.log('2nd Monday in Jan - initializing recommitment cycle');
      return await this.handleStartRecommitment();
    }
    if (week === 3) {
      this.logger.log('3rd Monday in Jan - sending reminder');
      return await this.handleInitiateReminder();
    }
  }

  @Cron(RecommitmentCron.EVERY_MONDAY_OF_FEB, {
    name: 'februaryMondayCron',
  })
  async februaryMondayCron() {
    const week = getWeekOfMonth(new Date());
    if (week === 2) {
      this.logger.log('2nd Monday in Feb - sending reminder');
      return await this.handleInitiateReminder();
    }
    if (week === 3) {
      this.logger.log('3rd Monday in Feb - sending reminder');
      return await this.handleInitiateReminder();
    }
  }

  @Cron(RecommitmentCron.EVERY_FRIDAY_OF_FEB, {
    name: 'februaryFridayCron',
  })
  async februaryFridayCron() {
    const week = getWeekOfMonth(new Date());
    if (week === 3) {
      this.logger.log('3rd Friday in Feb - end recommitment cycle');
      return await this.handleEndRecommitment();
    }
  }

  async handleStartRecommitment() {
    const currentDate = new Date();
    const recommitmentCycleData = new RecommitmentCycleEntity();
    recommitmentCycleData.year = currentDate.getFullYear();
    recommitmentCycleData.startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 2,
    );

    recommitmentCycleData.endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    const cycle: RecommitmentCycleEntity =
      await this.recommitmentCycleRepository.save(
        this.recommitmentCycleRepository.create(recommitmentCycleData),
      );
    const personnel =
      await this.personnelService.findPersonnelForRecommitment();

    personnel.forEach(async (person: PersonnelEntity) => {
      if (person.emcr) {
        await this.recommitmentRepository.save(
          this.recommitmentRepository.create({
            memberId: person.id,
            recommitmentCycleId: cycle['year'],
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
            memberId: person.id,
            recommitmentCycleId: cycle['year'],
            status: RecommitmentStatus.PENDING,
            memberDecisionDate: null,
            supervisorIdir: null,
            supervisorDecisionDate: null,
            program: Program.BCWS,
          }),
        );
      }
    });
  }

  async handleInitiateReminder() {
    //TODO trigger email to all members who are pending and to all supervisors of members who are MEMBER_COMMITTED
    const personnel =
      await this.personnelService.findPersonnelForRecommitment();
    const personnelIds = personnel.map((person) => person.id);
    const pendingMembers = await this.recommitmentRepository.find({
      where: {
        memberId: In(personnelIds),
        status: RecommitmentStatus.PENDING,
      },
    });
    pendingMembers.forEach(async (person: RecommitmentEntity) => {
      await this.mailService.generateAndSendTemplate(
        EmailTemplates.MEMBER_FOLLOW_UP,
        TemplateType.MEMBER,
        personnel.filter((p) => p.id === person.memberId),
        person.program,
      );
    });

    const committedMembers = await this.recommitmentRepository.find({
      where: {
        memberId: In(personnelIds),
        status: RecommitmentStatus.MEMBER_COMMITTED,
      },
    });
    committedMembers.forEach(async (person: RecommitmentEntity) => {
      await this.mailService.generateAndSendTemplate(
        EmailTemplates.SUPERVISOR_REMINDER,
        TemplateType.SUPERVISOR,
        personnel.filter((p) => p.id === person.memberId),
        person.program,
      );
    });
  }
  async handleEndRecommitment() {
    //TODO trigger email to all members who are pending and to all supervisors of members who are MEMBER_COMMITTED
    const personnel =
      await this.personnelService.findPersonnelForRecommitment();
    const personnelIds = personnel.map((person) => person.id);
    const pendingMembersBCWS = await this.recommitmentRepository.find({
      where: {
        memberId: In(personnelIds),
        status: In([
          RecommitmentStatus.PENDING,
          RecommitmentStatus.MEMBER_COMMITTED,
        ]),
        program: Program.BCWS,
      },
    });
    const stillPendingBCWSPersonnel = personnel.filter((person) =>
      pendingMembersBCWS.map((itm) => itm.memberId).includes(person.id),
    );
    stillPendingBCWSPersonnel.forEach(async (person: PersonnelEntity) => {
      person.bcws.status = Status.INACTIVE;
      await this.personnelService.save(person);
    });
    await this.mailService.generateAndSendTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      stillPendingBCWSPersonnel,
      Program.BCWS,
    );

    const pendingMembersEMCR = await this.recommitmentRepository.find({
      where: {
        memberId: In(personnelIds),
        status: In([
          RecommitmentStatus.PENDING,
          RecommitmentStatus.MEMBER_COMMITTED,
        ]),
        program: Program.EMCR,
      },
    });

    const stillPendingEMCRPersonnel = personnel.filter((person) =>
      pendingMembersEMCR.map((itm) => itm.memberId).includes(person.id),
    );
    stillPendingBCWSPersonnel.forEach(async (person: PersonnelEntity) => {
      person.bcws.status = Status.INACTIVE;
      await this.personnelService.save(person);
    });
    await this.mailService.generateAndSendTemplate(
      EmailTemplates.MEMBER_NO_RESPONSE,
      TemplateType.MEMBER,
      stillPendingEMCRPersonnel,
      Program.EMCR,
    );
  }
}
