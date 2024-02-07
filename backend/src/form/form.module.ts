import { Module } from '@nestjs/common';
import { FormSubmissionController } from './form.controller';
import { FormService } from './form.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [PersonnelModule],
  providers: [FormService],
  controllers: [FormSubmissionController],
})
export class FormModule {}
