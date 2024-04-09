import { ICS_TRAINING_NAME } from '../common/const';
import { datasource } from './datasource';

const insertTrainingSql = `INSERT INTO public."training" ("id", "name") VALUES (1, '${ICS_TRAINING_NAME}');`;
const insertPersonnelTrainingSql = `
INSERT INTO public."personnel_training" ("personnelId", "trainingId")
SELECT id as "personnelId", 1 as "trainingId" FROM public."personnel" WHERE status = 'ACTIVE';
`

const seedFunction = async () => {
  await datasource.initialize();
  const functions = await datasource.query(`SELECT * FROM public."training"`);
  if (functions.length === 0) {
    await datasource.query(insertTrainingSql);
    return await datasource.query(insertPersonnelTrainingSql);
  }
  return 'Already seeded';
};

seedFunction();
