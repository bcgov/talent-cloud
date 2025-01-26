import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from './mail.service';
import { MailBatchEntity } from '../database/entities/mail-batch.entity';
import { MailEntity } from '../database/entities/mail.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([MailBatchEntity, MailEntity]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
