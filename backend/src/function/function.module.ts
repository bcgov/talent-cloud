import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';
import { EmcrFunctionEntity } from '../database/entities/emcr/emcr-function.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([EmcrFunctionEntity])],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [TypeOrmModule, FunctionService],
})
export class FunctionModule {}
