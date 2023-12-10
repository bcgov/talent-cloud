import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('/app')
  @HealthCheck()
  checkApp() {
    return this.health.check([]);
  }

  @Get('/db')
  @HealthCheck()
  checkDB() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
