// Join Table between Personnel and Functions
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EmcrFunctionEntity } from './emcr-function.entity';
import { EmcrPersonnelEntity } from './emcr.entity';
import { Experience } from '../../../common/enums/emcr/experience.enum';
import { EmcrExperienceRO } from '../../../personnel/ro/emcr';

@Entity('emcr_function_experience')
export class EmcrExperienceEntity {
  @ManyToOne(() => EmcrPersonnelEntity, (e) => e.experiences)
  @JoinColumn({ name: 'personnel_id', referencedColumnName: 'personnelId' })
  personnel: EmcrPersonnelEntity;

  @PrimaryColumn({ name: 'personnel_id' })
  personnelId: string;

  @ManyToOne(() => EmcrFunctionEntity, (f) => f.id)
  @JoinColumn({ name: 'function_id', referencedColumnName: 'id' })
  function: EmcrFunctionEntity;

  @PrimaryColumn({ name: 'function_id' })
  functionId: number;

  @Column({
    name: 'experience_type',
    type: 'enum',
    enum: Experience,
    enumName: 'experience',
  })
  experienceType: Experience;

  toResponseObject(): EmcrExperienceRO {
    return {
      id: this.functionId,
      functionName: this.function.name,
      functionAbbrv: this.function.abbreviation,
      experienceType: this.experienceType,
    };
  }
}
