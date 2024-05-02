import {
  EmcrFunctionEntity,
  EmcrLocationEntity,
  EmcrPersonnelEntity,
} from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';

import { handler as dataHandler } from '../common/utils';
import { datasource } from '../database/datasource';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  const cicd = process.env.ENV === 'ci';

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locationRepo = datasource.getRepository(EmcrLocationEntity);
  const functionRepo = datasource.getRepository(EmcrFunctionEntity);

  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {
    const seededLocations = await locationRepo.find();
    const seededFunctions = await functionRepo.find();

    console.log('Seeding Data...');

    if (cicd) {
      // await datasource.query(testSql);
    } else if (!cicd) {
      const data = dataHandler(seededLocations, seededFunctions);

      await Promise.all(
        data.map(async (personnel) => {
          const { personnelData, emcrData } = personnel;

          const emcr = new EmcrPersonnelEntity(emcrData);

          const person = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(personnelData)),
          );

          emcr.personnelId = person.id;

          await emcrPersonnelRepo.save(emcr);
        }),
      );
    }

    console.log('...complete...');

    await datasource.destroy();
    return 'success';
  } catch (e) {
    console.log(e);
    console.log('Seeder failed.');
    return 'failure';
  }
};

handler();
