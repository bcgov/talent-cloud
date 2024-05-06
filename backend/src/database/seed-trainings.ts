import { datasource } from './datasource';
import { insertPersonnelTrainingSql, insertTrainingSql } from './queries';

const seedTraining = async () => {
  await datasource.initialize();
  const functions = await datasource.query(
    `SELECT * FROM public."emcr_training"`,
  );
  if (functions.length === 0) {
    await datasource.query(insertTrainingSql);
    return await datasource.query(insertPersonnelTrainingSql);
  }
  return 'Already seeded';
};

seedTraining();
