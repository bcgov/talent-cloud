import { Module } from '@nestjs/common';
import { FormSubmissionController } from './form.controller';
import { FormService } from './form.service';
import { PersonnelModule } from '../personnel/personnel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';

@Module({
  imports: [PersonnelModule, TypeOrmModule.forFeature([Form])],
  providers: [FormService],
  controllers: [FormSubmissionController],
})
export class FormModule {}
