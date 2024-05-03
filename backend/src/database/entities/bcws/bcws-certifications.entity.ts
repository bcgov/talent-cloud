import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CertificationName } from '../../../common/enums/bcws';

@Entity('bcws_certification')
export class BcwsCertificationEntity {
  @PrimaryColumn('int')
  id: number;

  @Column({
    name: 'name',
    type: 'enum',
    enum: CertificationName,
    enumName: 'CertificationName',
  })
  name: CertificationName;
}
