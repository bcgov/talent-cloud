import { datasource } from './datasource';
import {
  EmcrPersonnelEntity, LocationEntity,
} from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/emcr-seed';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }
  const locationRepo = datasource.getRepository(LocationEntity);  
  const locations = await locationRepo.find()
  const functions = await datasource.query('SELECT * FROM emcr_function')
  const trainings = await datasource.query('SELECT * FROM emcr_training')

  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {

    for (let i = 0; i < 50; i++) {
      const { personnelData, emcrData } = dataHandler(locations.map(itm=> ({locationName: itm.locationName, region: itm.region, id: itm.id})),
        functions,
        trainings)
      
      const person = await personnelRepo.save(personnelRepo.create(new PersonnelEntity(personnelData)))

      await emcrPersonnelRepo.save(emcrPersonnelRepo.create(new EmcrPersonnelEntity(({ ...emcrData, personnelId: person.id }))));
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
