import { datasource } from './datasource';
import { divisionsSql } from './queries';

const seedDivisions = async () => {
  await datasource.initialize();

  const divisions = await datasource.query(`SELECT * FROM public.division`);
  if (divisions.length === 0) {
    return await datasource.query(divisionsSql);
  }
  return 'Already seeded';
};

seedDivisions();
