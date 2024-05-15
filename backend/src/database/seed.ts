import { functionSqlAfter, functionSqlPrior } from './create-availability-functions';
import { datasource } from './datasource';
import { certsSql, divisionsSql, functionSql, insertPersonnelTrainingSql, insertTrainingSql, joinedLocationsSql, rolesSql, toolsSql } from './queries';

const seedTools = async () => {
  await datasource.initialize();


  await datasource.query(functionSqlPrior);
  await datasource.query(functionSqlAfter);

  const roles = await datasource.query(`SELECT * FROM public.bcws_role`);
  if (roles.length === 0) {
    await datasource.query(rolesSql);
  }
  const trainings = await datasource.query(
    `SELECT * FROM public."emcr_training"`,
  );
  if (trainings.length === 0) {
    await datasource.query(insertTrainingSql);
    await datasource.query(insertPersonnelTrainingSql);
  }
  const locations = await datasource.query(`SELECT * FROM public.location`);
  if (locations.length === 0) {
    await datasource.query(joinedLocationsSql);
  }
  const functions = await datasource.query(
    `SELECT * FROM public.emcr_function`,
  );
  if (functions.length === 0) {
    await datasource.query(functionSql);
  }
  const tools = await datasource.query(`SELECT * FROM public.bcws_tools`);
  if (tools.length === 0) {
    await datasource.query(toolsSql);
  }

  const divisions = await datasource.query(`SELECT * FROM public.division`);
  if (divisions.length === 0) {
    await datasource.query(divisionsSql);
  }

  const data = await datasource.query(
    `SELECT * FROM public.bcws_certification`,
  );
  if (data.length === 0) {
    await datasource.query(certsSql);
  }


  'Already seeded';
};

seedTools();
