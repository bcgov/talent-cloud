import { datasource } from '../datasource';
import {
  certsSql,
  functionSql,
  insertPersonnelTrainingSql,
  insertTrainingSql,
  joinedLocationsSql,
  rolesSql,
  toolsSql,
} from '../queries';

const seed = async () => {
  await datasource.initialize();
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

  const tools = await datasource.query(`SELECT * FROM public.tool`);
  if (tools.length === 0) {
    await datasource.query(toolsSql);
  }

  const data = await datasource.query(`SELECT * FROM public.certification`);
  if (data.length === 0) {
    await datasource.query(certsSql);
  }
};

seed();
