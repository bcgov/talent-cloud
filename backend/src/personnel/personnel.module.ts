import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';

import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';

import { LoggerModule } from '../logger/logger.module';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/bcws';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      PersonnelEntity,
      AvailabilityEntity,
      RecommitmentCycleEntity,
      CertificationEntity,
      LanguageEntity,
      LanguageEntity,
      CertificationEntity,
      ToolsEntity,
    ]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
