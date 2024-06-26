import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AuthModule } from '../src/auth/auth.module';
import { DatabaseModule } from '../src/database/database.module';
import { FormModule } from '../src/form/form.module';
import { LoggerModule } from '../src/logger/logger.module';
import { PersonnelModule } from '../src/personnel/personnel.module';
import { RegionsAndLocationsModule } from '../src/region-location/region-location.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        DatabaseModule,
        LoggerModule,
        TerminusModule,
        AuthModule,
        PersonnelModule,
        FormModule,
        RegionsAndLocationsModule,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
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
