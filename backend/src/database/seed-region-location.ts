import { datasource } from './datasource';
import { locationSql } from './queries';

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public.location`);
  if (locations.length === 0) {
    return await datasource.query(locationSql);
  }
  return 'Already seeded';
};

seedLocation();
