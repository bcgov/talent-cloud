import { locationSql } from "./queries";
import { datasource } from "./datasource";

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public."location"`);
  if (locations.length === 0) {
    return await datasource.query(locationSql);
  }
  return 'Already seeded';
};

seedLocation();
