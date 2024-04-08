import { FunctionEntity } from './entities/function.entity';
import { LocationEntity } from './entities/location.entity';
import { handler as dataHandler } from '../common/utils';
import { PersonnelEntity } from './entities/personnel.entity';
import { personnel } from './data'
import {
  functionSqlAfter,
  functionSqlPrior,
} from '../database/create-availability-functions';
import { datasource } from '../database/datasource';
import { functionSql } from '../database/seed-functions';
import {  locationSql } from '../database/seed-location';

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
    console.log('Seeding Location Data...');

    const locationData = await locationRepo.find();

    if (locationData.length === 0) {
      await datasource.query(locationSql);
    }

    console.log('Seeding Function Data...');

    const functionData = await functionRepo.find();

    if (functionData.length === 0) {
      await datasource.query(functionSql);
    }

    console.log('Seeding DB Functions...');

    await datasource.query(functionSqlPrior);
    await datasource.query(functionSqlAfter);

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