import { datasource } from './datasource';

const functionSql = `INSERT INTO public."function" (name,abbreviation) VALUES
	 ('Operations','Ops'),
	 ('Emergency Support Services','ESS'),
	 ('First Nations','FN'),
	 ('Finance','Fin'),
	 ('Liaison','Liaison'),
	 ('Logistics','Logs'),
	 ('Plans','Plans'),
	 ('Advanced Planning Unit','APU'),
	 ('Recovery','Recovery'),
	 ('Director / Deputy Director','DDir');`;

const seedFunction = async () => {
  await datasource.initialize();
  const functions = await datasource.query(`SELECT * FROM public."function"`);
  if (functions.length === 0) {
    return await datasource.query(functionSql);
  }
  return 'Already seeded';
};

seedFunction();
