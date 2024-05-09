import { Request, Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithRoles } from './interface';
import { UserInfoRO } from './ro/user-info.ro';

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
            type: 'varchar',
          },
        },
        username: {
          type: 'varchar',
        },
      },
    },
  })
  @Get('userInfo')
  async getRole(@Request() req: RequestWithRoles): Promise<UserInfoRO> {
    try {
      return { role: req.role, username: req.username, program: req.program };
    } catch (e) {
      throw new NotFoundException({
        ...e,
        message: 'No user found with the given username and role',
      });
    }
  }
}
