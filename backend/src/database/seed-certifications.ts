import { datasource } from './datasource';
import { certs } from './queries';

const seedLocation = async () => {
  await datasource.initialize();

  const data = await datasource.query(
    `SELECT * FROM public.bcws_certification`,
  );
  if (data.length === 0) {
    await datasource.query(certs);
  }
  return 'Already seeded';
};

seedLocation();
