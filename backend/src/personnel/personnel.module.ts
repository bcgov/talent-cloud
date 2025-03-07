import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { SupervisorController } from './supervisor.controller';
import { AuditModule } from '../audit/audit.module';
import { PersonnelSubscriber } from '../audit/subscribers/personnel.subscriber';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { LoggerModule } from '../logger/logger.module';
import { MailModule } from '../mail/mail.module';
import { PersonnelTools } from '../database/entities/personnel/personnel-tools.entity';
import { RegionsAndLocationsModule } from '../region-location/region-location.module';

@Module({
  imports: [
    LoggerModule,
    MailModule,
    AuditModule,
    RegionsAndLocationsModule,
    TypeOrmModule.forFeature([
      PersonnelEntity,
      AvailabilityEntity,
      CertificationEntity,
      LanguageEntity,
      CertificationEntity,
      ToolsEntity,
      PersonnelTools 
    ]),
  ],
  controllers: [PersonnelController, SupervisorController],
  providers: [PersonnelService, PersonnelSubscriber],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
