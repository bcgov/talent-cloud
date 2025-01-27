import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MailEntity } from './mail.entity';
import { EmailTags } from '../../mail/constants';

@Entity('mail_batch')
export class MailBatchEntity {
  @CreateDateColumn()
  date: Date;

  @PrimaryColumn()
  txId: string;

  @Column()
  tag: string;

  @Column()
  template: EmailTags;

  @OneToMany(() => MailEntity, (mail) => mail.txId)
  contexts: MailEntity[];
}
