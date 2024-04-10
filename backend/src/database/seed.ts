import { FunctionEntity } from './entities/function.entity';
import { LocationEntity } from './entities/location.entity';
import { handler as dataHandler } from '../common/utils';
import { PersonnelEntity } from './entities/personnel.entity';
import { personnel } from './data'
import { datasource } from '../database/datasource';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {


const cicd = process.env.ENV === 'ci';

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locationRepo = datasource.getRepository(LocationEntity);
  const functionRepo = datasource.getRepository(FunctionEntity);
  const personnelRepo = datasource.getRepository(PersonnelEntity);

  try {

    const seededLocations = await locationRepo.find();
    const seededFunctions = await functionRepo.find();

    console.log('Seeding Data...');

    const personnelData = cicd ? personnel : dataHandler(seededLocations, seededFunctions);

    await Promise.all(personnelData.map((itm) => personnelRepo.save(itm)));

    console.log('...complete...');

    await datasource.destroy();
    return 'success';
  } catch (e) {
    console.log(e);
    console.log('Seeder failed.');
    return 'failure';
  }
};

handler()