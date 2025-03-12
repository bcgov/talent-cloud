import { NestFactory } from '@nestjs/core';
import { isAfter } from 'date-fns';
import { datasource } from '../database/datasource';
import { AppLogger } from '../logger/logger.service';
import { ChipsAppModule } from '../modules/chips-app.module';
import { PersonnelService } from '../personnel/personnel.service';

(async () => {
  if (!datasource) {
    await datasource.initialize();
  }
  const app = await NestFactory.createApplicationContext(ChipsAppModule);

  const logger = new AppLogger();
  let personnelUpdates = 0;
  try {
    logger.log(`Starting CHIPS updates`);
    const personnelService = app.get(PersonnelService);
    const personnel = await personnelService.getChipsPersonnelToUpdate();

    if (personnel.length === 0) {
      logger.log(`No personnel left to update from CHIPS`);
      return;
    }
    logger.error(
      `CHIPS: Checking updates for '${personnel.map((p) => p.id).join('; ')}`,
    );

    for (const p of personnel) {
      const chipsResponse = await personnelService.getChipsMemberData(p.email);
      if (
        (isAfter(chipsResponse.actionDate, p.chipsLastActionDate) ||
          !p.chipsLastActionDate) &&
        isAfter(chipsResponse.actionDate, p.updatedAt)
      ) {
        logger.log(`Updating personnel ${p.id} from CHIPS`);
        personnelUpdates += 1;
        await personnelService.updatePersonnelChipsData(p, chipsResponse);
      } else {
        logger.log(`No CHIPS personnel update for ${p.id}`);
        await personnelService.updatePersonnelChipsLastPing(p);
      }
    }
  } catch (error) {
    logger.error(`Error from CHIPS, ${personnelUpdates} members updated`);
    logger.error(error);
  } finally {
    logger.log(`End of job, ${personnelUpdates} members updated`);
    process.exit(0);
  }
})();
