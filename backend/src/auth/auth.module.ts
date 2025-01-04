import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { TokenGuard } from './token.guard';
import { LoggerModule } from '../logger/logger.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { RecommitmentModule } from '../recommitment/recommitment.module';

@Module({
  imports: [LoggerModule, PersonnelModule, RecommitmentModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
