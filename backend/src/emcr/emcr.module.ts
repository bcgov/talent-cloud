import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmcrController } from './emcr.controller';
import { EmcrService } from './emcr.service';
import { AuditModule } from '../audit/audit.module';
import { EmcrPersonnelSubscriber } from '../audit/subscribers/emcr-personnel.subscriber';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  EmcrPersonnelEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { LocationEntity } from '../database/entities/location.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelModule } from '../personnel/personnel.module';

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
    AuditModule,
  ],
  controllers: [EmcrController],
  providers: [EmcrService, AppLogger, EmcrPersonnelSubscriber],
  exports: [TypeOrmModule, EmcrService],
})
export class EmcrModule {}
