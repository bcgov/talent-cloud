import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditService } from '../audit.service';
import { EmcrPersonnelEntity } from '../../database/entities/emcr/emcr-personnel.entity';

@EventSubscriber()
export class EmcrPersonnelSubscriber
  implements EntitySubscriberInterface<EmcrPersonnelEntity>
{
  constructor(
    dataSource: DataSource,
    private readonly clsService: ClsService,
    private readonly auditService: AuditService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return EmcrPersonnelEntity;
  }

  afterInsert(event: InsertEvent<EmcrPersonnelEntity>) {
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

  afterUpdate(event: UpdateEvent<EmcrPersonnelEntity>): void {
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
