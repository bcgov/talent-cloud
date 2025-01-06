import { Test } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app: INestApplication = moduleRef.createNestApplication();
    await app.init();
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a string', async () => {
      const res = await appController.checkApp();
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
