import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcwsController } from './bcws.controller';
import { BcwsService } from './bcws.service';
import { AuditModule } from '../audit/audit.module';
import { BcwsPersonnelSubscriber } from '../audit/subscribers/bcws-personnel.subscriber';
import {
  BcwsPersonnelEntity,
  BcwsSectionsAndRolesEntity,
} from '../database/entities/bcws';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { LocationEntity } from '../database/entities/location.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BcwsPersonnelEntity,
      BcwsSectionsAndRolesEntity,
      LocationEntity,
      BcwsRoleEntity,
    ]),
    PersonnelModule,
    AuditModule,
  ],

  controllers: [BcwsController],
  providers: [BcwsService, AppLogger, BcwsPersonnelSubscriber],
  exports: [TypeOrmModule, BcwsService],
})
export class BcwsModule {}
