import { datasource } from './datasource';
import { BcwsPersonnelEntity } from './entities/bcws';
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
      const data = dataHandler(
        locations,
        roles,
        tools,
        certs,
        divisions,
      );

      await Promise.all(

        data.map(async (personnel) => {
          const { personnelData, bcwsData } = personnel;


          const bcws = new BcwsPersonnelEntity(bcwsData);

          const person = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(personnelData)),
          );

          bcws.personnelId = person.id;

          bcws.tools.forEach((tool) => (tool.personnelId = person.id));
          bcws.roles.forEach((role) => (role.personnelId = person.id));
          bcws.certifications.forEach((cert) => (cert.personnelId = person.id));
          bcws.languages.forEach((lang) => (lang.personnelId = person.id));

          await bcwsPersonnelRepo.save(bcws);
        }));


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
