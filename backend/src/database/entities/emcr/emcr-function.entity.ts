import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmcrExperienceEntity } from './emcr-function-experience.entity';
import { EmcrFunctionRO } from '../../../personnel/ro/emcr';

@Entity('emcr_function')
export class EmcrFunctionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'abbreviation', type: 'varchar', length: 10 })
  abbreviation: string;

  @OneToMany(() => EmcrExperienceEntity, (e) => e.functionId)
  experiences: EmcrExperienceEntity[];

  toResponseObject(): EmcrFunctionRO {
    return {
      id: this.id,
      name: this.name,
      abbreviation: this.abbreviation,
    };
  }
}
