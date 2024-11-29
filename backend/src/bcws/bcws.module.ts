import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import {
  BcwsPersonnelEntity,
  BcwsSectionsAndRolesEntity,
} from '../database/entities/bcws';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BcwsPersonnelEntity,
      BcwsSectionsAndRolesEntity,
      BcwsRoleEntity,
    ]),
    PersonnelModule,
  ],

  controllers: [BcwsController],
  providers: [BcwsService, AppLogger],
  exports: [TypeOrmModule, BcwsService],
})
export class BcwsModule {}
