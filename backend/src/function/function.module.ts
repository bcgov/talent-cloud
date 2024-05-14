import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { EmcrFunctionEntity } from '../database/entities/emcr';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([EmcrFunctionEntity, BcwsRoleEntity]),
  ],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [TypeOrmModule, FunctionService],
})
export class FunctionModule {}
