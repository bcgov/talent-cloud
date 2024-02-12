import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

//TODO: Remove this entity and include with personnel once we have final data model for form

@Entity('form')
export class Form extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  data: unknown;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
