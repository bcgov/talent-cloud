import { faker } from '@faker-js/faker';
import { datasource } from '../datasource';
import { createEMCRhandler } from './create-emcr';
import { createPersonnelHandler } from './create-personnel';
import { EmcrPersonnelEntity } from '../entities/emcr';
import { LocationEntity } from '../entities/location.entity';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }
  const locationRepo = datasource.getRepository(LocationEntity);
  const locations = await locationRepo.find();
  const functions = await datasource.query('SELECT * FROM emcr_function');
  const trainings = await datasource.query('SELECT * FROM emcr_training');
  const tools = await datasource.query('SELECT * FROM tool');
  const certs = await datasource.query('SELECT * FROM certification');
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {
    for (let i = 0; i < 50; i++) {
      const dateApplied = faker.date.past();
      const { personnelData } = createPersonnelHandler(locations, tools, certs);

      const { emcrData } = createEMCRhandler(
        functions,
        trainings,

        dateApplied,
      );

      const person = await personnelRepo.save(
        personnelRepo.create(new PersonnelEntity(personnelData)),
      );

      await emcrPersonnelRepo.save(
        emcrPersonnelRepo.create(
          new EmcrPersonnelEntity({ ...emcrData, personnelId: person.id }),
        ),
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
