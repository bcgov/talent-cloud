import { Request, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithRoles, Role } from './interface';
import { UserInfoRO } from './ro/user-info.ro';
import { Roles } from './roles.decorator';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'Get User Info',
    description: 'Returns the user roles and username',
  })
  @ApiResponse({
    status: 200,
    description: 'User Info',
    schema: {
      type: 'object',
      properties: {
        roles: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        username: {
          type: 'string',
        },
      },
    },
  })
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get('userInfo')
  async getRole(@Request() req: RequestWithRoles): Promise<UserInfoRO> {
    try {
      return { roles: req.roles, username: req.username };
    } catch (e) {
      return { username: '', roles: [] };
    }
  }
}
