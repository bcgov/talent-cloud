import { Module } from '@nestjs/common';
import { IntakeFormController } from './intake-form.controller';
import { IntakeFormService } from './intake-form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntakeFormEntity } from '../database/entities/form/intake-form.entity';
import { PersonnelModule } from '../personnel/personnel.module';
import { AppLogger } from '../logger/logger.service';

@Module({
  imports: [PersonnelModule, TypeOrmModule.forFeature([IntakeFormEntity])],
  controllers: [IntakeFormController],
  providers: [IntakeFormService, AppLogger], 
  exports: [IntakeFormService, TypeOrmModule]
})
export class IntakeFormModule {}
