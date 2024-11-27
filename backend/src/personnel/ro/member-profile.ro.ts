import { ApiProperty } from '@nestjs/swagger';
import { PersonnelRO } from './personnel.ro';
import { PersonnelEntity } from '../../database/entities/personnel/personnel.entity';

export class MemberProfileRO {
  @ApiProperty({
    description: 'PersonnelData',
    required: true,
  })
  personnelData: Record<string, PersonnelRO>;

  @ApiProperty({
    description: 'BcwsData',
    required: false,
  })
  bcws?: Record<string, PersonnelRO>;

  @ApiProperty({
    description: 'EmcrData',
    required: false,
  })
  emcr?: Record<string, PersonnelRO>;

  constructor(data: PersonnelEntity) {
    Object.assign(this, data);
  }
}
