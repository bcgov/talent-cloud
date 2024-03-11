import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceEntity } from '../database/entities/personnel-function-experience.entity';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([PersonnelEntity, AvailabilityEntity, ExperienceEntity]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule],
})
export class PersonnelModule {}
