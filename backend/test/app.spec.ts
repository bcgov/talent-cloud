import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { DatabaseModule } from '../src/database/database.module';
import { LoggerModule } from '../src/logger/logger.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [DatabaseModule, LoggerModule, TerminusModule, HttpModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return health information', async () => {
      const res = await appController.checkApp();
      console.log(res);

      expect(res).toStrictEqual({
        api: {
          details: {},
          error: {},
          info: {},
          status: 'ok',
        },
        db: {
          details: {
            database: {
              status: 'up',
            },
          },
          error: {},
          info: {
            database: {
              status: 'up',
            },
          },
          status: 'ok',
        },
      });
    });
  });
});
