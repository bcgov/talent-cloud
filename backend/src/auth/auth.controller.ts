import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Roles('coordinator')
  @Get(Role.COORDINATOR)
  async getRole(@Request() req) {
    try {
      return { roles: req.roles };
    } catch (e) {
      return { roles: [] };
    }
  }

  @Get('authenticated')
  getAuth() {
    return { authenticated: true };
  }
}
