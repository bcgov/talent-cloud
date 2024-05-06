import { datasource } from './datasource';
import { toolsSql } from './queries';

const seedTools = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public.bcws_tools`);
  if (locations.length === 0) {
    return await datasource.query(toolsSql);
  }
  return 'Already seeded';
};

seedTools();
