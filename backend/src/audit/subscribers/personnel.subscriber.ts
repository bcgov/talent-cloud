import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { AuditService } from '../audit.service';
import { PersonnelEntity } from '../../database/entities/personnel/personnel.entity';

@EventSubscriber()
export class PersonnelSubscriber
  implements EntitySubscriberInterface<PersonnelEntity>
{
  entityId: string;

  constructor(
    dataSource: DataSource,
    private readonly clsService: ClsService,
    private readonly auditService: AuditService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return PersonnelEntity;
  }

  afterInsert(event: InsertEvent<PersonnelEntity>) {
    if (!this.clsService.get('primaryRole')) {
      // Typically, insertion of personnel would be from the CHEFS form, hence SYSTEM
      this.clsService.set('email', 'SYSTEM');
    }
    this.auditService.logAudit(
      'NULL',
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.id,
    );
  }

  afterLoad(entity: PersonnelEntity): void {
    this.entityId = entity.id;
  }

  afterUpdate(event: UpdateEvent<PersonnelEntity>): void {
    delete event.entity.bcws;
    delete event.entity.emcr;
    if (!this.clsService.get('primaryRole')) {
      // This could happen in automated jobs from the system
      this.clsService.set('email', 'SYSTEM');
    }
    this.auditService.logAudit(
      JSON.stringify(event.databaseEntity),
      JSON.stringify(event.entity),
      event.metadata.targetName,
      this.entityId,
    );
  }
}
