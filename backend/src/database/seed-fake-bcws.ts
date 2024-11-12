import { datasource } from './datasource';
import { BcwsPersonnelEntity } from './entities/bcws';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/bcws-seed';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  const createTestMember = async () => {
    const { personnelData, bcwsData } = dataHandler(
      locations,
      roles,
      tools,
      certs,
    );

    const testMember = await personnelRepo.findOne({
      where: { email: 'member@gmail.com' },
    });

    if (!testMember) {
      const member = await personnelRepo.save(
        personnelRepo.create(
          new PersonnelEntity({
            ...personnelData,
            email: 'member@gmail.com',
            firstName: 'Jane',
            lastName: 'Fonda',
            supervisorEmail: 'supervisor@gov.bc.ca',
          }),
        ),
      );

      bcwsData.personnelId = member.id;
      bcwsData.languages.forEach((itm) => (itm.personnelId = member.id));
      await bcwsPersonnelRepo.save(
        bcwsPersonnelRepo.create(new BcwsPersonnelEntity(bcwsData)),
      );
    } else {
      bcwsData.personnelId = testMember.id;
      bcwsData.languages.forEach((itm) => (itm.personnelId = testMember.id));
      await bcwsPersonnelRepo.save(
        bcwsPersonnelRepo.create(new BcwsPersonnelEntity(bcwsData)),
      );
    }
  };
  const createTestUser = async () => {
    const { personnelData, bcwsData } = dataHandler(
      locations,
      roles,
      tools,
      certs,
    );
    const testBcwsCoordinator = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'bcws-coordinator@gov.bc.ca',
          firstName: 'BCWS',
          lastName: 'Coordinator',
        }),
      ),
    );

    bcwsData.personnelId = testBcwsCoordinator.id;
    bcwsData.languages.forEach(
      (itm) => (itm.personnelId = testBcwsCoordinator.id),
    );
    await bcwsPersonnelRepo.save(
      bcwsPersonnelRepo.create(new BcwsPersonnelEntity(bcwsData)),
    );
  };

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locations = await datasource.query('SELECT * FROM location');
  const tools = await datasource.query('SELECT * FROM bcws_tools');
  const certs = await datasource.query('SELECT * FROM bcws_certification');
  const roles = await datasource.query('SELECT * FROM bcws_role');
  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);

  try {
    createTestUser();
    createTestMember();
    for (let i = 0; i < 50; i++) {
      const { personnelData, bcwsData } = dataHandler(
        locations,
        roles,
        tools,
        certs,
      );

      const person = await personnelRepo.save(
        personnelRepo.create(new PersonnelEntity(personnelData)),
      );

      bcwsData.personnelId = person.id;

      bcwsData.languages.forEach((itm) => (itm.personnelId = person.id));
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
