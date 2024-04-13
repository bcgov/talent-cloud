import { FunctionEntity } from './entities/function.entity';
import { LocationEntity } from './entities/location.entity';
import { handler as dataHandler } from '../common/utils';
import { PersonnelEntity } from './entities/personnel.entity';
import { datasource } from '../database/datasource';
import { TrainingEntity } from './entities/training.entity';
import {
  locationSql, functionSql, insertTrainingSql
} from '../database/queries';
import { testSql } from './test-data';
// import {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {


  const cicd = process.env.ENV === 'ci';

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const locationRepo = datasource.getRepository(LocationEntity);
  const functionRepo = datasource.getRepository(FunctionEntity);
  const trainingRepo = datasource.getRepository(TrainingEntity);

  const personnelRepo = datasource.getRepository(PersonnelEntity);

  try {

    const seededLocations = await locationRepo.find();
    const seededFunctions = await functionRepo.find();
    const seededTrainings = await trainingRepo.find();
    console.log('Seeding Data...');


    if (seededLocations.length === 0) {
      await datasource.query(locationSql);
    }
    if (seededFunctions.length === 0) {
      await datasource.query(functionSql);
    }
    if (seededTrainings.length === 0) {
      await datasource.query(insertTrainingSql);
    }
    if (cicd) {
      await datasource.query(testSql);
    } else if (!cicd) {
      const personnelData = dataHandler(seededLocations, seededFunctions);

      await Promise.all(personnelData.map((itm) => personnelRepo.save(itm)));
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

handler()