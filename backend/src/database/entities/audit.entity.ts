import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audit')
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column('jsonb')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  @Column('varchar')
  updatedBy: string;

  @Column('varchar')
  entityId?: string; // Typically personnel id
}
