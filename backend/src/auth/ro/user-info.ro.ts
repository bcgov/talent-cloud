import { ApiProperty } from '@nestjs/swagger';
import { Program, Role } from '../interface';

export class UserInfoRO {
  @ApiProperty({
    name: 'username',
    description: 'Logged in User Info',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    name: 'idir',
    description: 'IDIR of the logged in user',
    example: 'coordinator@gov.bc.ca',
  })
  idir: string;

  @ApiProperty({
    name: 'roles',
    description: 'Roles of the logged in user',
    isArray: true,
    type: () => Role,
  })
  role: Role;

  @ApiProperty({
    name: 'program',
    description: 'Program of the logged in user',
    isArray: true,
    type: () => Program,
  })
  program: Program;
}
