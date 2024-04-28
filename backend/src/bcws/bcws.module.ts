import { Module } from '@nestjs/common';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import { LoggerModule } from '../logger/logger.module';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [LoggerModule, PersonnelModule],
  controllers: [BcwsController],
  providers: [BcwsService],
})
export class BcwsModule {}
