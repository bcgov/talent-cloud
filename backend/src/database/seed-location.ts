import { datasource } from './datasource';

const functionSql = `INSERT INTO public."location" (id, location_name, region) VALUES
(0,  '100 Mile House', 'NEA') ,
(1,  '150 Mile House', 'NEA') ,
(2,  'Abbotsford', 'SWE') ,
(3,  'Brentwood Bay', 'HQ') ,
(4,  'Burnaby', 'SWE') ,
(5,  'Burns Lake', 'NWE') ,
(6,  'Bonnington Falls', 'SWE') ,
(7,  'Campbell River', 'VIC') ,
(8,  'Castlegar', 'SEA') ,
(9,  'Cumberland', 'VIC') ,
(10,  'Coquitlam', 'SWE') ,
(11,  'Courtenay', 'VIC') ,
(12,  'Cranbrook', 'SEA') ,
(13,  'Dawson Creek', 'NEA') ,
(14,  'Elkford', 'SEA') ,
(15,  'Enderby', 'CTL') ,
(16,  'Esquimalt', 'HQ') ,
(17,  'Fort St. John', 'NEA') ,
(18,  'Fort Nelson', 'NEA') ,
(19,  'Kamloops', 'CTL') ,
(20,  'Kelowna', 'CTL') ,
(21,  'Kimberly', 'SEA') ,
(22,  'Langford', 'HQ') ,
(23,  'Langley', 'SWE') ,
(24,  'Lillooet', 'SWE') ,
(25,  'Mackenzie', 'NEA') ,
(26,  'Maple Ridge', 'SWE') ,
(27,  'Merritt', 'CTL') ,
(28,  'Nanaimo', 'VIC') ,
(29,  'Nelson', 'SEA') ,
(30,  'New Westminster', 'SWE') ,
(31,  'North Vancouver', 'SWE') ,
(32,  'Port Alberni', 'VIC') ,
(33,  'Prince George', 'NEA') ,
(34,  'Qualicum Beach', 'VIC') ,
(35,  'Quesnel', 'NEA') ,
(36,  'Revelstoke', 'SEA') ,
(37,  'Richmond', 'SWE') ,
(38,  'Saanich', 'HQ') ,
(39,  'Saanichton', 'HQ') ,
(40,  'Salmon Arm', 'CTL') ,
(41,  'Sidney', 'HQ') ,
(42,  'Smithers', 'NWE') ,
(43,  'Sorrento', 'CTL') ,
(44,  'Surrey', 'SWE') ,
(45,  'Terrace', 'NWE') ,
(46,  'Ucluelet', 'VIC') ,
(47,  'Vancouver', 'SWE') ,
(48,  'Victoria', 'HQ') ,
(49,  'Vernon', 'CTL') ,
(50,  'Whistler', 'SWE') ,
(51,  'Williams Lake', 'NEA')`

const seedLocation = async () => {
  await datasource.initialize();
  
  const locations = await datasource.query(`SELECT * FROM public."location"`);
  if (locations.length === 0) {
    return await datasource.query(functionSql);
  }
  return 'Already seeded';
};

seedLocation();
