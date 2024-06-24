import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { EmcrFunctionEntity } from '../database/entities/emcr';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      EmcrFunctionEntity,
      BcwsCertificationEntity,
      BcwsToolsEntity,
      BcwsRoleEntity,
    ]),
  ],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [TypeOrmModule, FunctionService],
})
export class FunctionModule {}
