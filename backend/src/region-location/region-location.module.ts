import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';

import { RegionsAndLocationsService } from './region-location.service';
import { LocationEntity } from '../database/entities/location.entity';

import { RegionsAndLocationsController } from './region-location.controller';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([LocationEntity])],
  controllers: [RegionsAndLocationsController],
  providers: [RegionsAndLocationsService],
  exports: [TypeOrmModule],
})
export class RegionsAndLocationsModule {}
