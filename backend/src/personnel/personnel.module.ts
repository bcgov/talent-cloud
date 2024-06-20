import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([PersonnelEntity, AvailabilityEntity]),
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService],
  exports: [TypeOrmModule, PersonnelService],
})
export class PersonnelModule {}
