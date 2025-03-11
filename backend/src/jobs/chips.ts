import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppLogger } from '../logger/logger.service';
import { datasource } from '../database/datasource';
import { PersonnelService } from '../personnel/personnel.service';
import { isAfter } from 'date-fns';
import { ChipsAppModule } from '../modules/chips-app.module';


(async () => {
  if (!datasource) {
    await datasource.initialize();
  }
  const app = await NestFactory.create<NestExpressApplication>(ChipsAppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();
  try {
    logger.log(`Starting CHIPS updates`);
    const personnelService = app.get(PersonnelService);
    const personnel = await personnelService.getChipsPersonnelToUpdate();

    if (personnel.length === 0) {
      logger.log(`No personnel left to update from CHIPS`);
      return;
    }

    for (const p of personnel) {
      const chipsResponse = await personnelService.getChipsMemberData(p.email);
      if (
        (
          isAfter(chipsResponse.actionDate, p.chipsLastActionDate) ||
          !p.chipsLastActionDate
        ) &&
        isAfter(chipsResponse.actionDate, p.updatedAt)
      ) {
        logger.log(`Updating personnel ${p.id} from CHIPS`);
        await personnelService.updatePersonnelChipsData(p, chipsResponse);
      } else {
        logger.log(`No CHIPS personnel update for ${p.id}`);
        await personnelService.updatePersonnelChipsLastPing(p);
      }
    }
  } catch (error) {
    logger.error('Error from CHIPS');
    logger.error(error);
  } finally {
    process.exit(0);
  }
})();