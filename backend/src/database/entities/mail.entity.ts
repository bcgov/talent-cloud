import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MailBatchEntity } from './mail-batch.entity';

@Entity('mail')
export class MailEntity {
  @CreateDateColumn()
  date: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => MailBatchEntity, (mailBatch) => mailBatch.txId)
  @JoinColumn({ name: 'txId', referencedColumnName: 'txId' })
  tx: MailBatchEntity;

  @PrimaryColumn()
  txId: string;

  @Column()
  email: string;

  @PrimaryColumn()
  msgId: string;

  @Column({ default: false })
  sent: boolean;

  @Column({ default: false })
  completed: boolean;
}
