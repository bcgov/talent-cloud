import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { SupervisorController } from './supervisor.controller';
import { EmcrExperienceEntity } from '../database/entities/emcr';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';
import { LoggerModule } from '../logger/logger.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    LoggerModule,
    MailModule,
    TypeOrmModule.forFeature([
      PersonnelEntity,
      AvailabilityEntity,
      RecommitmentCycleEntity,
      RecommitmentEntity,
      CertificationEntity,
      LanguageEntity,
      CertificationEntity,
      ToolsEntity,
      EmcrExperienceEntity, // TODO: Tech debt, bug in saving experiences through personnel, cannot remove existing
    ]),
  ],
  controllers: [PersonnelController, SupervisorController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
