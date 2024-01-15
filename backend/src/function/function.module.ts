import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from '../database/entities/function.entity';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([FunctionEntity])],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [TypeOrmModule],
})
export class FunctionModule {}
