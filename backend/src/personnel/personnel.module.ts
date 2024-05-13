import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcwsPersonnelEntity, BcwsSectionsAndRolesEntity } from '../database/entities/bcws';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';

import { AvailabilityEntity } from '../database/entities/availability.entity';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  LocationEntity,
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
      BcwsPersonnelEntity,
      BcwsSectionsAndRolesEntity,
      LocationEntity,
    ]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
