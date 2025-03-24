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
    logger.log(`CHIPS: Starting CHIPS updates`);
    const personnelService = app.get(PersonnelService);
    const personnel = await personnelService.getChipsPersonnelToUpdate();

    if (personnel.length === 0) {
      logger.log(`CHIPS: No personnel left to update from CHIPS`);
      return;
    }
    logger.log(
      `CHIPS: Checking updates for ${personnel.map((p) => p.id).join('; ')}`,
    );

    for (const p of personnel) {
      const chipsResponse = await personnelService.getChipsMemberData(p.email);
      if (chipsResponse?.success && chipsResponse?.data) {
        if (
          isAfter(chipsResponse.data.actionDate, p.chipsLastActionDate) ||
          !p.chipsLastActionDate
        ) {
          logger.log(`CHIPS: Updating personnel ${p.id}`);
          await personnelService.updatePersonnelChipsData(
            p,
            chipsResponse.data,
          );
          personnelUpdates += 1;
        } else {
          logger.log(`CHIPS: No recent updates for ${p.id}`);
          await personnelService.updatePersonnelChipsMeta(p);
        }
      } else if (chipsResponse?.success && !chipsResponse?.data) {
        logger.log(
          `CHIPS: No data available for ${p.id}, setting profile missing to TRUE`,
        );
        await personnelService.updatePersonnelChipsMeta(p, true);
      } else {
        logger.error(
          `CHIPS: Error from CHIPS when requesting data for ${p.id}`,
        );
      }
    }
  } catch (error) {
    logger.error(
      `CHIPS: Error from CHIPS, ${personnelUpdates} members updated`,
    );
    logger.error(error);
  } finally {
    logger.log(`CHIPS: End of job, ${personnelUpdates} members updated`);
    process.exit(0);
  }
})();
