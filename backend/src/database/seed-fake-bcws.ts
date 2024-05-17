import { datasource } from './datasource';
import { BcwsPersonnelEntity, LanguageEntity } from './entities/bcws';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/bcws-seed';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {


  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locations = await datasource.query('SELECT * FROM location')
  const tools = await datasource.query('SELECT * FROM bcws_tools')
  const certs = await datasource.query('SELECT * FROM bcws_certification')
  const roles = await datasource.query('SELECT * FROM bcws_role')
  const divisions = await datasource.query('SELECT * FROM division')
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);
    

      try {

        for (let i = 0; i < 50; i++) {
          const { personnelData, bcwsData } = dataHandler(locations,
            roles,
            tools,
            certs,
            divisions)
          
          const person = await personnelRepo.save(personnelRepo.create(new PersonnelEntity(personnelData)))
          
          bcwsData.personnelId = person.id;
          
          bcwsData.languages.forEach(itm => itm.personnelId = person.id)
          await bcwsPersonnelRepo.save(bcwsPersonnelRepo.create(new BcwsPersonnelEntity((bcwsData))));
          }

      console.log('...complete...');

      await datasource.destroy();
      return 'success';
    } catch (e) {
      console.log(e);
      console.log('Seeder failed.');
      return 'failure';
    }
  }

  handler();
