import { datasource } from '../datasource';
import { EmcrPersonnelEntity } from '../entities/emcr';
import { LocationEntity } from '../entities/location.entity';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';
import { createEMCRhandler } from './create-emcr';
import { createPersonnelHandler } from './create-personnel';
import { faker } from '@faker-js/faker';
import { Status } from '../../common/enums';

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
    const status =
      Status[
        faker.helpers.arrayElement([
          Status.ACTIVE,
          Status.INACTIVE,
          Status.PENDING,
        ])
      ];

    const dateApplied = faker.date.past();
    const { personnelData } = createPersonnelHandler(
      status,
      locations,
      tools,
      certs,
    );

    const { emcrData } = createEMCRhandler(
      functions,
      trainings,
      status,
      dateApplied,
    );

    const person = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'member@gmail.com',
          supervisorEmail: 'emcr-coordinator@gov.bc.ca',
        }),
      ),
    );

    await emcrPersonnelRepo.save(
      emcrPersonnelRepo.create(
        new EmcrPersonnelEntity({ ...emcrData, personnelId: person.id }),
      ),
    );

    for (let i = 0; i < 50; i++) {
      const status =
        Status[
          faker.helpers.arrayElement([
            Status.ACTIVE,
            Status.INACTIVE,
            Status.PENDING,
          ])
        ];

      const dateApplied = faker.date.past();
      const { personnelData } = createPersonnelHandler(
        status,
        locations,
        tools,
        certs,
      );

      const { emcrData } = createEMCRhandler(
        functions,
        trainings,
        status,
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
