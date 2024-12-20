import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { EmailTemplates } from '../mail/constants';
import { Program, RequestWithRoles } from '../auth/interface';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentCycleRO } from '../database/entities/recommitment/recommitment-cycle.ro';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelRecommitmentDTO } from './dto/update-personnel-recommitment.dto';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { MailService } from '../mail/mail.service';
import { PersonnelService } from './personnel.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { PersonnelEntity } from 'src/database/entities/personnel/personnel.entity';
import { TemplateType } from 'src/mail/constants';

export enum RecommitmentCron {
  SECOND_MONDAY_OF_JAN = '0 0 * 1 1#2',
  THIRD_MONDAY_OF_JAN = '0 0 * 1 1#3',
  FOURTH_MONDAY_OF_JAN = '0 0 * 1 1#4',
  FIRST_MONDAY_OF_FEB = '0 0 * 2 1#1',
  SECOND_MONDAY_OF_FEB = '0 0 * 2 1#2',
  THIRD_FRIDAY_OF_FEB = '0 0 * 2 5#3',
}

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
  async updatePersonnelRecommitmentStatus(
    id: string,
    recommitmentUpdate: Partial<UpdatePersonnelRecommitmentDTO>,
    req: RequestWithRoles,
  ): Promise<any> {
    console.log(id, recommitmentUpdate, req.idir);

    const personnel = await this.personnelService.findOne(id);
    const recommitment = await this.recommitmentRepository.findOneOrFail({
      where: { memberId: id, recommitmentCycleId: recommitmentUpdate.year },
    });
    const { year } = recommitmentUpdate;

    if (recommitmentUpdate.program === Program.BCWS) {
      recommitment.bcws = recommitmentUpdate.status;
      if (recommitmentUpdate.reason) {
        recommitment.supervisorReasonBcws = recommitmentUpdate.reason;
      }
    }
    if (recommitmentUpdate.program === Program.EMCR) {
      recommitment.emcr = recommitmentUpdate.status;
      if (recommitmentUpdate.reason) {
        recommitment.supervisorReasonEmcr = recommitmentUpdate.reason;
      }
    }

    await this.recommitmentRepository.update(
      { memberId: id, recommitmentCycleId: year },
      { ...recommitment },
    );
    await this.triggerEmail(id, recommitmentUpdate);
    return await this.personnelService.findOne(id);
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
    recommitmentUpdate: Partial<UpdatePersonnelRecommitmentDTO>,
    req: RequestWithRoles,
  ): Promise<any> {
    console.log(id, recommitmentUpdate, req.idir);
    const recommitment = await this.recommitmentRepository.findOneOrFail({
      where: { memberId: id, recommitmentCycleId: recommitmentUpdate.year },
    });

    const { year } = recommitmentUpdate;

    if (recommitmentUpdate.program === Program.BCWS) {
      recommitment.bcws = recommitmentUpdate.status;
      if (recommitmentUpdate.reason) {
        recommitment.memberReasonBcws = recommitmentUpdate.reason;
      }
    }
    if (recommitmentUpdate.program === Program.EMCR) {
      recommitment.emcr = recommitmentUpdate.status;
      if (recommitmentUpdate.reason) {
        recommitment.memberReasonBcws = recommitmentUpdate.reason;
      }
    }
    if (recommitmentUpdate.program === Program.ALL) {
      recommitment.bcws = recommitmentUpdate.status;
      recommitment.emcr = recommitmentUpdate.status;
      if (recommitmentUpdate.reason) {
        recommitment.memberReasonBcws = recommitmentUpdate.reason;
        recommitment.memberReasonEmcr = recommitmentUpdate.reason;
      }
    }
    recommitment.memberDecisionDate = new Date();
    const updated = await this.recommitmentRepository.update(
      { memberId: id, recommitmentCycleId: year },
      { ...recommitment },
    );
    console.log(updated);
    const personnel = await this.personnelService.findOne(id);

    if (recommitmentUpdate.status === RecommitmentStatus.MEMBER_COMMITTED) {
      return await this.mailService.generateAndSendTemplate(
        EmailTemplates.SUPERVISOR_REQUEST,
        TemplateType.SUPERVISOR,
        [personnel],
        recommitmentUpdate.program,
      );
    }
    if (recommitmentUpdate.status === RecommitmentStatus.MEMBER_DENIED) {
      return await this.mailService.generateAndSendTemplate(
        EmailTemplates.MEMBER_DENIED,
        TemplateType.MEMBER,
        [personnel],
        recommitmentUpdate.program,
      );
    }

    return personnel;
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
    const cycle = await this.getRecommitmentPeriod();
    //TODO set all final recommitment status's and emails
  }

  async initRecommitmentCycle() {
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
      const commitment = await this.recommitmentRepository.save(
        this.recommitmentRepository.create({
          memberId: person.id,
          recommitmentCycleId: cycle['year'],
          emcr: person?.emcr ? RecommitmentStatus.PENDING : null,
          bcws: person?.bcws ? RecommitmentStatus.PENDING : null,
          memberDecisionDate: null,
          memberReasonEmcr: null,
          memberReasonBcws: null,
          supervisorIdir: null,
          supervisorDecisionDate: null,
        }),
      );
      person.recommitment = commitment;
      await this.personnelService.save(person);
    });
  }

  @Cron(RecommitmentCron.SECOND_MONDAY_OF_JAN, {
    name: 'initiateRecommitment',
    timeZone: 'America/Vancouver',
  })
  async handleInitiateRecommitmentCron() {
    this.logger.log('Called when the second Monday of January');
    await this.initRecommitmentCycle();
  }

  @Cron(RecommitmentCron.THIRD_MONDAY_OF_JAN, {
    name: 'firstRecommitmentReminder',
    timeZone: 'America/Vancouver',
  })
  handleInitiateReminderCron() {
    //TODO trigger email to all members who are pending and to all supervisors of members who are MEMBER_COMMITTED
  }

  @Cron(RecommitmentCron.FIRST_MONDAY_OF_FEB, {
    name: 'secondRecommitmentReminder',
    timeZone: 'America/Vancouver',
  })
  handleInitiateSecondReminderCron() {
    this.logger.log('Called when the second Monday of January');
    //TODO trigger email to all members who are pending and to all supervisors of members who are MEMBER_COMMITTED
  }

  @Cron(RecommitmentCron.SECOND_MONDAY_OF_FEB, {
    name: 'finalRecommitmentReminder',
    timeZone: 'America/Vancouver',
  })
  handleInitiateFinalReminderCron() {
    //TODO trigger email to all members who are pending and to all supervisors of members who are MEMBER_COMMITTED
  }

  @Cron(RecommitmentCron.THIRD_FRIDAY_OF_FEB, {
    name: 'endRecommitment',
    timeZone: 'America/Vancouver',
  })
  handleEndRecommitmentCycle() {
    this.endRecommitmentCycle();
  }
}
