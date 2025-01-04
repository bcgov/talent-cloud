import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AuthModule } from '../src/auth/auth.module';
import { BcwsModule } from '../src/bcws/bcws.module';
import { DatabaseModule } from '../src/database/database.module';
import { EmcrModule } from '../src/emcr/emcr.module';
import { FormModule } from '../src/form/form.module';
import { LoggerModule } from '../src/logger/logger.module';
import { PersonnelModule } from '../src/personnel/personnel.module';
import { RecommitmentModule } from '../src/recommitment/recommitment.module';
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
        BcwsModule,
        EmcrModule,
        FormModule,
        RegionsAndLocationsModule,
        RecommitmentModule,
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
