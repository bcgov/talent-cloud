import { datasource } from './datasource';
import { functionSql } from './queries';


const seedFunction = async () => {
  await datasource.initialize();
  const functions = await datasource.query(`SELECT * FROM public."function"`);
  if (functions.length === 0) {
    return await datasource.query(functionSql);
  }
  return 'Already seeded';
};

seedFunction();
