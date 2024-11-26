import { ApiProperty } from '@nestjs/swagger';
import { PersonnelRO } from './personnel.ro';
import { PersonnelEntity } from '../../database/entities/personnel.entity';
import { BcwsPersonnelRoleRO } from 'src/bcws/ro';

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

  @ApiProperty({
    description: 'Roles',
    required: false,
  })
  roles?: any[];

  @ApiProperty({
    description: 'Experiences',
    required: false,
  })
  experiences?: any[];

  constructor(data: PersonnelEntity) {
    Object.assign(this, data);
    // TODO: Clean this up, standardize a bit more
    this.roles = data.bcws?.roles?.map((role) => role.toResponseObject()) ?? [];
    this.experiences =
      data.emcr?.experiences?.map((experience) => experience.toResponseObject()) ??
      [];
  }
}
