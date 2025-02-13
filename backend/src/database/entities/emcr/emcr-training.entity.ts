import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emcr_training')
export class EmcrTrainingEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  constructor(data: Partial<EmcrTrainingEntity>) {
    Object.assign(this, data);
  }
}
