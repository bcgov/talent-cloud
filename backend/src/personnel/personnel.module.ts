import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';

import { AvailabilityEntity } from '../database/entities/availability.entity';
import { BcwsPersonnelEntity, BcwsSectionsAndRolesEntity, LanguageEntity } from '../database/entities/bcws';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
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
      BcwsToolsEntity,
      BcwsCertificationEntity,
      LocationEntity,
      LanguageEntity
    ]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
