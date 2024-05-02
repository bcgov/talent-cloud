import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionController } from './form.controller';
import { FormService } from './form.service';
import { Form } from '../database/entities/form.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Form])],
  providers: [FormService],
  controllers: [FormSubmissionController],
  exports: [TypeOrmModule, FormService],
})
export class FormModule {}
