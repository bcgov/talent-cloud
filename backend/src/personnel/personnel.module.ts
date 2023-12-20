import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { PersonnelEntity } from 'src/database/entities/personnel.entity';
import { PersonnelController } from './personnel.controller';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([PersonnelEntity]),
  ],
  controllers: [PersonnelController],
  exports: [TypeOrmModule],
})
export class PersonnelModule {}
