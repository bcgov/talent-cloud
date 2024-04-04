import { datasource } from './datasource';

export const functionSql = `INSERT INTO public."location" (location_name, region) VALUES
  ('100 Mile House',  'NEA' ),
  ('150 Mile House',  'NEA' ),
  ('Abbotsford',  'SWE' ),
  ('Brentwood Bay',  'HQ' ),
  ('Burnaby',  'SWE' ),
  ('Burns Lake',  'NWE' ),
  ('Bonnington Falls',  'SEA' ),
  ('Campbell River',  'VIC' ),
  ('Castlegar',  'SEA' ),
  ('Cumberland',  'VIC' ),
  ('Coquitlam',  'SWE' ),
  ('Courtenay',  'VIC' ),
  ('Cranbrook',  'SEA' ),
  ( 'Dawson Creek',  'NEA' ),
  ('Duncan',  'VIC'),
  ('Elkford',  'SEA' ),
  ('Enderby',  'CTL' ),
  ('Esquimalt',  'HQ' ),
  ('Fort St. John',  'NEA' ),
  ('Fort Nelson',  'NEA' ),
  ('Kamloops',  'CTL' ),
  ('Kelowna',  'CTL' ),
  ('Kimberley',  'SEA' ),
  ('Langford',  'HQ' ),
  ('Langley',  'SWE' ),
  ('Lillooet',  'SWE' ),
  ('Mackenzie',  'NEA' ),
  ('Maple Ridge',  'SWE' ),
  ('Merritt',  'CTL' ),
  ('Mill Bay',  'VIC'),
  ('Mission',  'SWE'),
  ('Nanaimo',  'VIC' ),
  ('Nelson',  'SEA' ),
  ('New Westminster',  'SWE' ),
  ('North Vancouver',  'SWE' ),
  ('Parksville',  'VIC'),
  ('Penticton',  'CTL' ),
  ('Port Alberni',  'VIC' ),
  ('Port McNeil',  'VIC'), 
  ('Prince George',  'NEA' ),
  ('Qualicum Beach',  'VIC' ),
  ('Quesnel',  'NEA' ),
  ('Revelstoke',  'SEA' ),
  ('Richmond',  'SWE' ),
  ('Saanich',  'HQ' ),
  ('Saanichton',  'HQ' ),
  ('Salmon Arm',  'CTL' ),
  ('Sechelt',  'VIC'),
  ('Sidney',  'HQ' ),
  ('Smithers',  'NWE' ),
  ('Sorrento',  'CTL' ),
  ('Surrey',  'SWE' ),
  ('Terrace',  'NWE' ),
  ('Ucluelet',  'VIC' ),
  ('Vancouver',  'SWE' ),
  ('Vernon', 'CTL'),
  ('Victoria',  'HQ' ),
  ('Whistler',  'SWE' ),
  ('Williams Lake',  'NEA' ), 
  ('Vanderhoof', 'NWE'), 
  ('Sooke', 'VIC')`;

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public."location"`);
  if (locations.length === 0) {
    return await datasource.query(functionSql);
  }
  return 'Already seeded';
};

seedLocation();
