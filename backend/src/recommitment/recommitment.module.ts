import { Module } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommitmentController } from './recommitment.controller';
import { RecommitmentService } from './recommitment.service';
import { AuditModule } from '../audit/audit.module';
import { RecommitmentSubscriber } from '../audit/subscribers/recommitment.subscriber';
import { BcwsModule } from '../bcws/bcws.module';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { EmcrModule } from '../emcr/emcr.module';
import { AppLogger } from '../logger/logger.service';
import { MailModule } from '../mail/mail.module';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [
    PersonnelModule,
    MailModule,
    AuditModule,
    BcwsModule,
    EmcrModule,
    TypeOrmModule.forFeature([RecommitmentEntity, RecommitmentCycleEntity]),
  ],
  controllers: [RecommitmentController],
  providers: [
    SchedulerRegistry,
    RecommitmentService,
    AppLogger,
    RecommitmentSubscriber,
  ],
  exports: [RecommitmentService],
})
export class RecommitmentModule {}
