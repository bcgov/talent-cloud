import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from 'src/logger/logger.service';
import { PersonnelModule } from 'src/personnel/personnel.module';
import { EmcrController } from './emcr.controller';
import { EmcrService } from './emcr.service';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  LocationEntity,
  EmcrPersonnelEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmcrExperienceEntity,
      EmcrFunctionEntity,
      LocationEntity,
      EmcrPersonnelEntity,
      EmcrTrainingEntity,
    ]),
    PersonnelModule,
  ],
  controllers: [EmcrController],
  providers: [EmcrService, AppLogger],
  exports: [TypeOrmModule, EmcrService],
})
export class EmcrModule {}
