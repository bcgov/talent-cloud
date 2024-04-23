import { Module } from '@nestjs/common';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import { LoggerModule } from '../logger/logger.module';

@Module({  
  imports: [LoggerModule], 
  controllers: [BcwsController],
  providers: [BcwsService]
})
export class BcwsModule {};