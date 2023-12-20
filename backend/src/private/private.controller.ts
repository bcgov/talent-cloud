import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('private')
export class PrivateController {
  @Get()
  getPrivateRoute() {
    return {
      message: 'Success',
      status: 200,
    };
  }
}
