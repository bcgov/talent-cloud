import { datasource } from '../datasource';
import { EmcrPersonnelEntity } from '../entities/emcr';
import { createPersonnelHandler } from './create-personnel';
import { BcwsPersonnelEntity } from '../entities/bcws';
import { LocationEntity } from '../entities/location.entity';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';
import { faker } from '@faker-js/faker';
import { Status } from '../../common/enums';
import { createEMCRhandler } from './create-emcr';
import { createBCWShandler } from './create-bcws';

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
    
    const { bcwsData } = createBCWShandler(roles, status, dateApplied);

    const personOne = new PersonnelEntity({
      ...personnelData,
      email: 'member@gmail.com',
      supervisorEmail: 'emcr-coordinator@gov.bc.ca',
    });
    const person = await personnelRepo.save(
      personnelRepo.create({ ...personOne }),
    );

    await emcrPersonnelRepo.save(
      emcrPersonnelRepo.create(
        new EmcrPersonnelEntity({ ...emcrData, personnelId: person.id }),
      ),
    );

    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(
        new BcwsPersonnelEntity({ ...bcwsData, personnelId: person.id }),
      ),
    );
    
    const personTwo = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'emcr-coordinator@gov.bc.ca',
          supervisorEmail: 'supervisor@gov.bc.ca',
        }),
      ),
    );

    await emcrPersonnelRepo.save(
      emcrPersonnelRepo.create(
        new EmcrPersonnelEntity({ ...emcrData, personnelId: personTwo.id }),
      ),
    );
    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(
        new BcwsPersonnelEntity({ ...bcwsData, personnelId: personTwo.id }),
      ),
    );

    const personThree = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'EMCR.LogisticsOfficerTest@gov.bc.ca',
          supervisorEmail: 'BCWS.CoordinatorTest@gov.bc.ca',
        }),
      ),
    );
    await emcrPersonnelRepo.save(
      emcrPersonnelRepo.create(
        new EmcrPersonnelEntity({ ...emcrData, personnelId: personThree.id }),
      ),
    );
    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(
        new BcwsPersonnelEntity({ ...bcwsData, personnelId: personThree.id }),
      ),
    );
   
    for (let i = 0; i < 50; i++) {
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
      
      const { bcwsData } = createBCWShandler(roles, status, dateApplied);

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
