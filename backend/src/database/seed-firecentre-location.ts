import { datasource } from './datasource';
import { bcwsLocations } from './queries';

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(
    `SELECT * FROM public.bcws_location`,
  );
  if (locations.length === 0) {
    await datasource.query(bcwsLocations);
  }
  return 'Already seeded';
};

seedLocation();
