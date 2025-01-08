import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommitmentController } from './recommitment.controller';
import { RecommitmentService } from './recommitment.service';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelModule } from '../personnel/personnel.module';
import { MailModule } from '../mail/mail.module';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [
    PersonnelModule,
    MailModule,
    TypeOrmModule.forFeature([RecommitmentEntity, RecommitmentCycleEntity]),
  ],
  controllers: [RecommitmentController],
  providers: [
    SchedulerRegistry,
    RecommitmentService,
    AppLogger,

    
  ],
  exports: [RecommitmentService]
})
export class RecommitmentModule {}
