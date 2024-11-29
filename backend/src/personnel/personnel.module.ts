import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      PersonnelEntity,
      AvailabilityEntity,
      RecommitmentCycleEntity,
      CertificationEntity,
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
