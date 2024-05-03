import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';

import { AvailabilityEntity } from '../database/entities/availability.entity';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  EmcrLocationEntity,
  EmcrPersonnelEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      PersonnelEntity,
      AvailabilityEntity,
      EmcrFunctionEntity,
      EmcrPersonnelEntity,
      EmcrExperienceEntity,
      EmcrTrainingEntity,
      EmcrLocationEntity,
    ]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
