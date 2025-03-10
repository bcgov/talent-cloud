import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';
import { datePST } from '../common/helpers';
import { AppLogger } from '../logger/logger.service';
import { datasource } from '../database/datasource';
import { PersonnelService } from '../personnel/personnel.service';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { Status } from '../common/enums';
import { isAfter } from 'date-fns';


(async () => {
  if (!datasource) {
    await datasource.initialize();
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();
  try {
    const personnelRepository = datasource.getRepository(PersonnelEntity);
    const qb = personnelRepository.createQueryBuilder('personnel');
    qb.leftJoinAndSelect('personnel.emcr', 'emcr');
    qb.leftJoinAndSelect('personnel.bcws', 'bcws');
    qb.andWhere('bcws.status = :status OR emcr.status = :status', { status: Status.ACTIVE });
    qb.andWhere('personnel.chipsProfileMissing = false');
    qb.andWhere('personnel.chipsLastPing < current_date');
    qb.take(10);
    const personnel = await qb.getMany();

    if (personnel.length === 0) {
      logger.log(`No personnel left to update from CHIPS`);
      return;
    }

    const personnelService = app.get(PersonnelService);
    for (const p of personnel) {
      const chipsResponse = await personnelService.getChipsMemberData(p.email);
      if (
        isAfter(chipsResponse.actionDate, p.chipsLastActionDate) &&
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