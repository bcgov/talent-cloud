import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../interface';

export class UserInfoRO {
  @ApiProperty({
    name: 'username',
    description: 'Logged in User Info',
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    name: 'roles',
    description: 'Roles of the logged in user',
    isArray: true,
    type: () => Role,
  })
  roles: Role[];
}
