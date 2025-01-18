import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { Repository } from 'typeorm';
import { Role } from '../auth/interface';
import { AuditEntity } from '../database/entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private auditRepository: Repository<AuditEntity>,
    private readonly clsService: ClsService,
  ) {}

  async logAudit(
    before: string,
    after: string,
    entityType: string,
    entityId?: string,
  ) {
    const updatedBy =
      this.clsService.get('primaryRole') === Role.MEMBER
        ? 'member'
        : this.clsService.get('email') || 'SYSTEM';
    await this.auditRepository.save({
      data: {
        before,
        after,
        entityType,
      },
      updatedBy: updatedBy || 'UNKNOWN',
      entityId,
    });
  }
}
