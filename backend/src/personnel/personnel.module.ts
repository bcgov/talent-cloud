import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { AppLogger } from '../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonnelEntity, AvailabilityEntity])],
  controllers: [PersonnelController],
  providers: [PersonnelService, AppLogger],
  exports: [TypeOrmModule],
})
export class PersonnelModule {}
