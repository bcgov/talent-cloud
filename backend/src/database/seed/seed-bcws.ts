import { Status } from '../../common/enums';
import { datasource } from '../datasource';
import { BcwsPersonnelEntity } from '../entities/bcws';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';
import { createBCWShandler } from './create-bcws';
import { createPersonnelHandler } from './create-personnel';
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locations = await datasource.query('SELECT * FROM location');
  const tools = await datasource.query('SELECT * FROM tool');
  const certs = await datasource.query('SELECT * FROM certification');
  const roles = await datasource.query('SELECT * FROM bcws_role');
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);
  const dateApplied = faker.date.past();

  
  
  try {
    const { personnelData } = createPersonnelHandler(
      
      locations,
      tools,
      certs,
    );
    const { bcwsData } = createBCWShandler(roles, dateApplied);

    const person = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'bcws-coordinator@gov.bc.ca',
          supervisorEmail: 'supervisor@gov.bc.ca',
        }),
      ),
    );

    bcwsData.personnelId = person.id;
    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(
        new BcwsPersonnelEntity({ ...bcwsData, personnelId: person.id }),
      ),
    );

    for (let i = 0; i < 50; i++) {
      const dateApplied = faker.date.past();
      const { personnelData } = createPersonnelHandler(
        
        locations,
        tools,
        certs,
      );
      
      
      
      const { bcwsData } = createBCWShandler(roles, dateApplied);

      const person = await personnelRepo.save(
        personnelRepo.create(new PersonnelEntity(personnelData)),
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
