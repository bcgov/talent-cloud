import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
