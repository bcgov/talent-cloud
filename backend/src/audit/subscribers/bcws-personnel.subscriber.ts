import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditService } from '../audit.service';
import { BcwsPersonnelEntity } from '../../database/entities/bcws/bcws-personnel.entity';

@EventSubscriber()
export class BcwsPersonnelSubscriber
  implements EntitySubscriberInterface<BcwsPersonnelEntity>
{
  constructor(
    dataSource: DataSource,
    private readonly clsService: ClsService,
    private readonly auditService: AuditService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BcwsPersonnelEntity;
  }

  afterInsert(event: InsertEvent<BcwsPersonnelEntity>) {
    this.auditService.logAudit(
      'NULL',
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.personnelId,
    );
  }

  afterUpdate(event: UpdateEvent<BcwsPersonnelEntity>): void {
    this.auditService.logAudit(
      JSON.stringify(event.databaseEntity),
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.personnelId,
    );
  }
}
