import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrivateController } from './private.controller';

@Module({
  imports: [AuthModule],
  controllers: [PrivateController],
})
export class PrivateModule {}
