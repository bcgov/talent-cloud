import { datasource } from './datasource';
import { EmcrPersonnelEntity, LocationEntity } from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';
import { handler as dataHandler } from '../common/emcr-seed';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  const createTestMember = async () => {
    const { personnelData, emcrData } = dataHandler(
      locations.map((itm) => ({
        locationName: itm.locationName,
        region: itm.region,
        id: itm.id,
      })),
      functions,
      trainings,
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
            firstName: 'Member',
            lastName: 'User',
          }),
        ),
      );

      await emcrPersonnelRepo.save(
        emcrPersonnelRepo.create(
          new EmcrPersonnelEntity({ ...emcrData, personnelId: member.id }),
        ),
      );
    } else {
      await emcrPersonnelRepo.save(
        emcrPersonnelRepo.create(
          new EmcrPersonnelEntity({ ...emcrData, personnelId: testMember.id }),
        ),
      );
    }
  };

  const createTestUser = async () => {
    const { personnelData, emcrData } = dataHandler(
      locations.map((itm) => ({
        locationName: itm.locationName,
        region: itm.region,
        id: itm.id,
      })),
      functions,
      trainings,
    );

    const person = await personnelRepo.save(
      personnelRepo.create(
        new PersonnelEntity({
          ...personnelData,
          email: 'emcr-coordinator@gov.bc.ca',
          firstName: 'EMCR',
          lastName: 'Coordinator',
        }),
      ),
    );

    await emcrPersonnelRepo.save(
      emcrPersonnelRepo.create(
        new EmcrPersonnelEntity({ ...emcrData, personnelId: person.id }),
      ),
    );
  };

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }
  const locationRepo = datasource.getRepository(LocationEntity);
  const locations = await locationRepo.find();
  const functions = await datasource.query('SELECT * FROM emcr_function');
  const trainings = await datasource.query('SELECT * FROM emcr_training');

  const personnelRepo = datasource.getRepository(PersonnelEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);

  try {
    createTestUser();
    createTestMember();
    for (let i = 0; i < 50; i++) {
      const { personnelData, emcrData } = dataHandler(
        locations.map((itm) => ({
          locationName: itm.locationName,
          region: itm.region,
          id: itm.id,
        })),
        functions,
        trainings,
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
