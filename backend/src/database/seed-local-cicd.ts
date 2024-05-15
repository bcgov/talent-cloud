import { personnel } from './data';
import { datasource } from './datasource';
import { BcwsPersonnelEntity } from './entities/bcws';

import {

  EmcrPersonnelEntity,

} from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/utils';
import { CreatePersonnelEmcrDTO } from '../personnel/dto/emcr';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  const cicd = process.env.ENV === 'ci';

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }
    
    const locations = await datasource.query('SELECT * FROM location')
    const functions = await datasource.query('SELECT * FROM emcr_function')
    const trainings = await datasource.query('SELECT * FROM emcr_training')
    const tools = await datasource.query('SELECT * FROM bcws_tools')
    const certs = await datasource.query('SELECT * FROM bcws_certification')
    const roles = await datasource.query('SELECT * FROM bcws_role')
    const divisions = await datasource.query('SELECT * FROM division')
    
    const personnelRepo = datasource.getRepository(PersonnelEntity);
    const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);
    const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);
try{
    if (cicd) {
      // await datasource.query(testSql);
      
      await Promise.all(
        personnel.map(async (person) => {
          const emcr: CreatePersonnelEmcrDTO = person.emcr;
          delete person.emcr;
          const personEntity = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(person)),
          );

          emcr.personnelId = personEntity.id;
          await emcrPersonnelRepo.save(new EmcrPersonnelEntity(emcr));
        }),
      );
    } else if (!cicd) {
      const data = dataHandler(
        locations,
        functions,
        roles,
        tools,
        certs,
        divisions,
        trainings
        
      );

      await Promise.all(
        data.map(async (personnel) => {
          const { personnelData, emcrData, bcwsData } = personnel;

          const emcr = new EmcrPersonnelEntity(emcrData);
          const bcws = new BcwsPersonnelEntity(bcwsData);

          const person = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(personnelData)),
          );

          bcws.personnelId = person.id;
          emcr.personnelId = person.id;
          bcws.tools.forEach((tool) => (tool.personnelId = person.id));
          bcws.roles.forEach((role) => (role.personnelId = person.id));
          bcws.certifications.forEach((cert) => (cert.personnelId = person.id));
          bcws.languages.forEach((lang) => (lang.personnelId = person.id));

          
          await emcrPersonnelRepo.save(emcr);
          await bcwsPersonnelRepo.save(bcws);
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
