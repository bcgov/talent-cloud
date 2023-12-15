import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Public } from './auth/public.decorator';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Public()
  @Get('/health')
  @HealthCheck()
  async checkApp() {
    return {
      api: await this.health.check([]),
      db: await this.health.check([() => this.db.pingCheck('database')]),
    };
  }
}
