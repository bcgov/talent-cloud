import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronTestService } from './cron-test.service';
import { CronService } from './cron.service';
import { RecommitmentController } from './recommitment.controller';
import { RecommitmentService } from './recommitment.service';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { AppLogger } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [
    PersonnelModule,
    TypeOrmModule.forFeature([RecommitmentEntity, RecommitmentCycleEntity]),
  ],
  controllers: [RecommitmentController],
  providers: [
    RecommitmentService,
    MailService,
    AppLogger,
    CronService,
    CronTestService,
  ],
  exports: [RecommitmentService],
})
export class RecommitmentModule {}