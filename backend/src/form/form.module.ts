import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionController } from './form.controller';
import { FormService } from './form.service';
import { Form } from '../database/entities/form.entity';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [PersonnelModule, TypeOrmModule.forFeature([Form])],
  providers: [FormService],
  controllers: [FormSubmissionController],
  exports: [TypeOrmModule],
})
export class FormModule {}
