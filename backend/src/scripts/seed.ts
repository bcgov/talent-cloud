import { FunctionEntity } from 'src/database/entities/function.entity';
import { LocationEntity } from 'src/database/entities/location.entity';
import { handler as dataHandler } from '../common/utils';
import {
  functionSqlAfter,
  functionSqlPrior,
} from '../database/create-availability-functions';
import { datasource } from '../database/datasource';
import { functionSql } from '../database/seed-functions';
import { functionSql as locationSql } from '../database/seed-location';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (_event?: unknown) => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locationRepo = datasource.getRepository('location');

  const functionRepo = datasource.getRepository('function');
  const personnelRepo = datasource.getRepository('personnel');

  try {
    console.log('Seeding Location Data...');

    const locationData = await locationRepo.find();

    if (locationData.length === 0) {
      return await datasource.query(locationSql);
    }
    console.log('Seeding Function Data...');
    const functionData = await functionRepo.find();
    if (functionData.length === 0) {
      return await datasource.query(functionSql);
    }
    console.log('Seeding DB Functions...');
    await datasource.query(functionSqlPrior);
    await datasource.query(functionSqlAfter);

    const seededLocations = await locationRepo.find();
    const seededFunctions = await functionRepo.find();

    console.log('Seeding Data...');
    const personnelData = dataHandler(
      seededLocations as LocationEntity[],
      seededFunctions as FunctionEntity[],
    );

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

console.log(handler());
