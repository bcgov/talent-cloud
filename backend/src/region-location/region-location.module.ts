import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegionsAndLocationsController } from './region-location.controller';
import { RegionsAndLocationsService } from './region-location.service';
import { LocationEntity } from '../database/entities/location.entity';
import { LoggerModule } from '../logger/logger.module';


@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([LocationEntity])],
  controllers: [RegionsAndLocationsController],
  providers: [RegionsAndLocationsService],
  exports: [TypeOrmModule, RegionsAndLocationsService],
})
export class RegionsAndLocationsModule {}
