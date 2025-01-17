import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { AuditEntity } from '../database/entities/audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
