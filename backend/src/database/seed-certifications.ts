import { datasource } from './datasource';
import { certsSql } from './queries';

const seedCertification = async () => {
  await datasource.initialize();

  const data = await datasource.query(
    `SELECT * FROM public.bcws_certification`,
  );
  if (data.length === 0) {
    await datasource.query(certsSql);
  }
  return 'Already seeded';
};

seedCertification();
