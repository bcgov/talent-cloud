import { datasource } from './datasource';

const functionSql = `INSERT INTO public."location" (id, location_name, region) VALUES
  (0, '100 Mile House',  'NEA' ),
  (1, '150 Mile House',  'NEA' ),
  (2, 'Abbotsford',  'SWE' ),
  (3, 'Brentwood Bay',  'HQ' ),
  (4, 'Burnaby',  'SWE' ),
  (5, 'Burns Lake',  'NWE' ),
  (6, 'Bonnington Falls',  'SEA' ),
  (7, 'Campbell River',  'VIC' ),
  (8, 'Castlegar',  'SEA' ),
  (9, 'Cumberland',  'VIC' ),
  (10, 'Coquitlam',  'SWE' ),
  (11, 'Courtenay',  'VIC' ),
  (12, 'Cranbrook',  'SEA' ),
  (13,  'Dawson Creek',  'NEA' ),
  (14, 'Duncan',  'VIC'),
  (15, 'Elkford',  'SEA' ),
  (16, 'Enderby',  'CTL' ),
  (17, 'Esquimalt',  'HQ' ),
  (18, 'Fort St. John',  'NEA' ),
  (19, 'Fort Nelson',  'NEA' ),
  (20, 'Kamloops',  'CTL' ),
  (21, 'Kelowna',  'CTL' ),
  (22, 'Kimberley',  'SEA' ),
  (23, 'Langford',  'HQ' ),
  (24, 'Langley',  'SWE' ),
  (25, 'Lillooet',  'SWE' ),
  (26, 'Mackenzie',  'NEA' ),
  (27, 'Maple Ridge',  'SWE' ),
  (28, 'Merritt',  'CTL' ),
  (29, 'Mill Bay',  'VIC'),
  (30, 'Mission',  'SWE'),
  (31, 'Nanaimo',  'VIC' ),
  (32, 'Nelson',  'SEA' ),
  (33, 'New Westminster',  'SWE' ),
  (34, 'North Vancouver',  'SWE' ),
  (35, 'Parksville',  'VIC'),
  (36, 'Penticton',  'CTL' ),
  (37, 'Port Alberni',  'VIC' ),
  (38, 'Port McNeil',  'VIC'), 
  (39, 'Prince George',  'NEA' ),
  (40, 'Qualicum Beach',  'VIC' ),
  (41, 'Quesnel',  'NEA' ),
  (42, 'Revelstoke',  'SEA' ),
  (43, 'Richmond',  'SWE' ),
  (44, 'Saanich',  'HQ' ),
  (45, 'Saanichton',  'HQ' ),
  (46, 'Salmon Arm',  'CTL' ),
  (47, 'Sechelt',  'VIC'),
  (48, 'Sidney',  'HQ' ),
  (49, 'Smithers',  'NWE' ),
  (50, 'Sorrento',  'CTL' ),
  (51, 'Surrey',  'SWE' ),
  (52, 'Terrace',  'NWE' ),
  (53, 'Ucluelet',  'VIC' ),
  (54, 'Vancouver',  'SWE' ),
  (55, 'Vernon', 'CTL'),
  (56, 'Victoria',  'HQ' ),
  (57, 'Whistler',  'SWE' ),
  (58, 'Williams Lake',  'NEA' )`;

const seedLocation = async () => {
  await datasource.initialize();

  const locations = await datasource.query(`SELECT * FROM public."location"`);
  if (locations.length === 0) {
    return await datasource.query(functionSql);
  }
  return 'Already seeded';
};

seedLocation();
