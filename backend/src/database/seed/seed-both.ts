import { faker } from '@faker-js/faker';
import { datasource } from '../datasource';
import { createBCWShandler } from './create-bcws';
import { createEMCRhandler } from './create-emcr';
import { createPersonnelHandler } from './create-personnel';
import { BcwsPersonnelEntity } from '../entities/bcws';
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
  const roles = await datasource.query('SELECT * FROM bcws_role');
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);

  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {
    for (let i = 0; i < 500; i++) {
      const dateApplied = faker.date.past();

      const { personnelData } = createPersonnelHandler(locations, tools, certs);

      const { emcrData } = createEMCRhandler(
        functions,
        trainings,

        dateApplied,
      );

      const { bcwsData } = createBCWShandler(roles, dateApplied);

      const person = await personnelRepo.save(
        personnelRepo.create(new PersonnelEntity(personnelData)),
      );

      await emcrPersonnelRepo.save(
        emcrPersonnelRepo.create(
          new EmcrPersonnelEntity({ ...emcrData, personnelId: person.id }),
        ),
      );

      bcwsData.personnelId = person.id;

      await bcwsPersonnelRepo.save(
        bcwsPersonnelRepo.create(new BcwsPersonnelEntity(bcwsData)),
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
