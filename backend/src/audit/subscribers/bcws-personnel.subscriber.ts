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
    if (!this.clsService.get('primaryRole')) {
      // Typically, insertion of personnel would be from the CHEFS form, hence SYSTEM
      this.clsService.set('email', 'SYSTEM');
    }
    this.auditService.logAudit(
      'NULL',
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.personnelId,
    );
  }

  afterUpdate(event: UpdateEvent<BcwsPersonnelEntity>): void {
    if (!this.clsService.get('primaryRole')) {
      // This could happen in automated jobs from the system
      this.clsService.set('email', 'SYSTEM');
    }
    this.auditService.logAudit(
      JSON.stringify(event.databaseEntity),
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.personnelId,
    );
  }
}
