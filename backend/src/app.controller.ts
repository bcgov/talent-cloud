import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Public } from './auth/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('/health')
  @HealthCheck()
  async checkApp() {
    return {
      api: await this.health.check([]),
      db: await this.health.check([() => this.db.pingCheck('database')]),
    };
  }

  @Get('/keycloak')
  async getKeycloak() {
    return {
      authUrl: process.env.KEYCLOAK_AUTH_URL,
      client: process.env.KEYCLOAK_CLIENT,
      realm: process.env.KEYCLOAK_REALM,
    }
  }
}
