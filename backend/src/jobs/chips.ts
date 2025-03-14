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
    logger.log(
      `CHIPS: Checking updates for ${personnel.map((p) => p.id).join('; ')}`,
    );

    for (const p of personnel) {
      const chipsResponse = await personnelService.getChipsMemberData(p.email);
      if (chipsResponse?.success && chipsResponse.data) {
        if (
          isAfter(chipsResponse.data.actionDate, p.chipsLastActionDate) ||
          !p.chipsLastActionDate
        ) {
          logger.log(`Updating personnel ${p.id} from CHIPS`);
          await personnelService.updatePersonnelChipsData(
            p,
            chipsResponse.data,
          );
          personnelUpdates += 1;
        } else {
          logger.log(`No CHIPS personnel update for ${p.id}`);
          await personnelService.updatePersonnelChipsMeta(p);
        }
      } else if (!chipsResponse?.success) {
        logger.log(
          `No CHIPS data available for ${p.id}, setting profile missing to TRUE`,
        );
        await personnelService.updatePersonnelChipsMeta(p, true);
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
