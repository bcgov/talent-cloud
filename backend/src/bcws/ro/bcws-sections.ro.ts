import { ApiProperty } from '@nestjs/swagger';
import { BcwsRole, BcwsRoleName, SectionName } from '../../common/enums';

export class RoleNamesRO {
  @ApiProperty({
    description: 'Role id, role name, and section name',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Role name',
    required: true,
  })
  name: BcwsRoleName;

  @ApiProperty({
    description: 'Section name',
    required: true,
  })
  enumName: BcwsRole;

  @ApiProperty({
    description: 'Section name',
    required: true,
  })
  section: SectionName;
}

export class BcwsSectionsRO {
  [key: string]: RoleNamesRO[];
}
