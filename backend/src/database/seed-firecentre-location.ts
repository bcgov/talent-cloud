import { datasource } from './datasource';
import { bcwsLocationsSql } from './queries';

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(
    `SELECT * FROM public.bcws_location`,
  );
  if (locations.length === 0) {
    await datasource.query(bcwsLocationsSql);
  }
  return 'Already seeded';
};

seedLocation();
