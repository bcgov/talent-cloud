import { datasource } from './datasource';
import { joinedLocationsSql } from './queries';

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public.location`);
  if (locations.length === 0) {
    return await datasource.query(joinedLocationsSql);
  }
  return 'Already seeded';
};

seedLocation();
