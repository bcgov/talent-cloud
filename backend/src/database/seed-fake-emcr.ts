import { datasource } from './datasource';
import { handler as dataHandler } from '../common/emcr-seed';
import { EmcrPersonnelEntity } from './entities/emcr';
import { LocationEntity } from './entities/location.entity';
import { PersonnelEntity } from './entities/personnel/personnel.entity';

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
    const { personnelData, emcrData } = dataHandler(
      locations.map((itm) => ({
        locationName: itm.locationName,
        region: itm.region,
        id: itm.id,
      })),
      functions,
      trainings,
      tools,
      certs,
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
    for (let i = 0; i < 50; i++) {
      const { personnelData, emcrData } = dataHandler(
        locations.map((itm) => ({
          locationName: itm.locationName,
          region: itm.region,
          id: itm.id,
        })),
        functions,
        trainings,
        tools,
        certs,
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
