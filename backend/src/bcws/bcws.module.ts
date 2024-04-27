import { Module } from '@nestjs/common';
import { PersonnelModule } from 'src/personnel/personnel.module';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, PersonnelModule],
  controllers: [BcwsController],
  providers: [BcwsService],
})
export class BcwsModule {}
