import { Request, Controller, Get } from '@nestjs/common';
import { Role } from './interface';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  @Roles(Role.COORDINATOR)
  @Get('userInfo')
  async getRole(@Request() req) {
    try {
      return { roles: req.roles, username: req.username };
    } catch (e) {
      return { roles: [] };
    }
  }

  @Get()
  getAuth() {
    return { authenticated: true };
  }
}
