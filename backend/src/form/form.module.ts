import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionController } from './form.controller';
import { FormService } from './form.service';
import { BcwsModule } from '../bcws/bcws.module';
import { Form } from '../database/entities/form.entity';
import { EmcrModule } from '../emcr/emcr.module';
import { LoggerModule } from '../logger/logger.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { RegionsAndLocationsModule } from '../region-location/region-location.module';

@Module({
  imports: [
    BcwsModule,
    EmcrModule,
    LoggerModule,
    RegionsAndLocationsModule,
    PersonnelModule,
    TypeOrmModule.forFeature([Form]),
  ],
  providers: [FormService],
  controllers: [FormSubmissionController],
  exports: [TypeOrmModule],
})
export class FormModule {}
