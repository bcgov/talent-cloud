import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import {
  BcwsPersonnelEntity,
  BcwsSectionsAndRolesEntity,
  LanguageEntity,
} from '../database/entities/bcws';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BcwsPersonnelEntity,
      BcwsSectionsAndRolesEntity,
      LanguageEntity,
      BcwsCertificationEntity,
      BcwsToolsEntity,
    ]),
    PersonnelModule,
  ],

  controllers: [BcwsController],
  providers: [BcwsService, AppLogger],
  exports: [TypeOrmModule, BcwsService],
})
export class BcwsModule {}
