import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [LoggerModule],
  controllers: [AuthController],
  providers: [AuthGuard, RolesGuard],
})
export class AuthModule {}
