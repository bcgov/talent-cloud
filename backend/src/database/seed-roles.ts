import { datasource } from './datasource';
import { rolesSql } from './queries';

const seedRoles = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public.bcws_role`);
  if (locations.length === 0) {
    return await datasource.query(rolesSql);
  }
  return 'Already seeded';
};

seedRoles();
