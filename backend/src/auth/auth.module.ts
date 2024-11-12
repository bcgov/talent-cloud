import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { LoggerModule } from '../logger/logger.module';
import { PersonnelModule } from '../personnel/personnel.module';

@Module({
  imports: [LoggerModule, PersonnelModule],
  providers: [
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'ROLES_GUARD',
      useClass: RolesGuard,
    },
    {
      provide: 'TOKEN_GUARD',
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
