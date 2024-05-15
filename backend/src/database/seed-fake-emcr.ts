import { datasource } from './datasource';
import {
  EmcrPersonnelEntity,
} from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/emcr-seed';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locations = await datasource.query('SELECT * FROM location')
  const functions = await datasource.query('SELECT * FROM emcr_function')
  const trainings = await datasource.query('SELECT * FROM emcr_training')

  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {
    const data = dataHandler(
      locations,
      functions,
      trainings
    );

    await Promise.all(

      data.map(async (personnel) => {
        const { personnelData, emcrData } = personnel;

        const emcr = new EmcrPersonnelEntity(emcrData);

        const person = await personnelRepo.save(
          personnelRepo.create(new PersonnelEntity(personnelData)),
        );

        emcr.personnelId = person.id;

        await emcrPersonnelRepo.save(emcr);
      }))


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
