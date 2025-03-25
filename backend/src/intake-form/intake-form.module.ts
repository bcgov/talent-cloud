import { Module } from '@nestjs/common';
import { IntakeFormController } from './intake-form.controller';
import { IntakeFormService } from './intake-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntakeFormEntity } from '../database/entities/form/intake-form.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { AppLogger } from '../logger/logger.service';
import { RegionsAndLocationsModule } from '../region-location/region-location.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule, RegionsAndLocationsModule, PersonnelModule, TypeOrmModule.forFeature([IntakeFormEntity])],
  controllers: [IntakeFormController],
  providers: [IntakeFormService, AppLogger], 
  exports: [IntakeFormService, TypeOrmModule]
})
export class IntakeFormModule {}
