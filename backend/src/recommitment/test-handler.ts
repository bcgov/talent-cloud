import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CronTestService } from './cron-test.service';
import { RecommitmentModule } from './recommitment.module';
;

export const  handler = async (email: string) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const cronTestService = app.select(RecommitmentModule).get(CronTestService);
  await cronTestService.scheduleTestCron(email);
  await app.close();

}
