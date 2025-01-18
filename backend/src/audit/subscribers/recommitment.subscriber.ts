import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { AuditService } from '../audit.service';
import { RecommitmentEntity } from '../../database/entities/recommitment/recommitment.entity';

@EventSubscriber()
export class RecommitmentSubscriber
  implements EntitySubscriberInterface<RecommitmentEntity>
{
  constructor(
    dataSource: DataSource,
    private readonly clsService: ClsService,
    private readonly auditService: AuditService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return RecommitmentEntity;
  }

  afterUpdate(event: UpdateEvent<RecommitmentEntity>): void {
    delete event.entity.personnel;

    // No database entity here?
    this.auditService.logAudit(
      JSON.stringify(event.databaseEntity),
      JSON.stringify(event.entity),
      event.metadata.targetName,
      event.entity.personnelId,
    );
  }
}
