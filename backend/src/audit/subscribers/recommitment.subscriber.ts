import {
  EventSubscriber,
} from 'typeorm';

@EventSubscriber()
export class RecommitmentSubscriber {}
//   implements EntitySubscriberInterface<RecommitmentEntity>
// {
//   constructor(
//     dataSource: DataSource,
//     private readonly clsService: ClsService,
//     private readonly auditService: AuditService,
//   ) {
//     dataSource.subscribers.push(this);
//   }

//   listenTo() {
//     return RecommitmentEntity;
//   }

//   afterUpdate(event: UpdateEvent<RecommitmentEntity>): void {
//     delete event.entity.personnel;
//     if (!this.clsService.get('primaryRole')) {
//       // This could happen in automated jobs from the system
//       this.clsService.set('email', 'SYSTEM');
//     }

//     // No database entity here?
//     this.auditService.logAudit(
//       JSON.stringify(event.databaseEntity),
//       JSON.stringify(event.entity),
//       event.metadata.targetName,
//       event.entity.personnelId,
//     );
//   }
// }
