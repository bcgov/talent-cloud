import { ICS_TRAINING_NAME } from '../common/const';

export const locationSql = `INSERT INTO public."location" (id, location_name, region) 
  VALUES(1, '100 Mile House',  'NEA' ),
  (2, '150 Mile House',  'NEA' ),
  (3, 'Abbotsford',  'SWE' ),
  (4, 'Brentwood Bay',  'HQ' ),
  (5, 'Burnaby',  'SWE' ),
  (6, 'Burns Lake',  'NWE' ),
  (7, 'Bonnington Falls',  'SEA' ),
  (8, 'Campbell River',  'VIC' ),
  (9, 'Castlegar',  'SEA' ),
  (10, 'Cumberland',  'VIC' ),
  (11, 'Coquitlam',  'SWE' ),
  (12, 'Courtenay',  'VIC' ),
  (13, 'Cranbrook',  'SEA' ),
  (14, 'Dawson Creek',  'NEA' ),
  (15, 'Duncan',  'VIC'),
  (16, 'Elkford',  'SEA' ),
  (17, 'Enderby',  'CTL' ),
  (18, 'Esquimalt',  'HQ' ),
  (19, 'Fort St. John',  'NEA' ),
  (20, 'Fort Nelson',  'NEA' ),
  (21, 'Kamloops',  'CTL' ),
  (22, 'Kelowna',  'CTL' ),
  (23, 'Kimberley',  'SEA' ),
  (24, 'Langford',  'HQ' ),
  (25, 'Langley',  'SWE' ),
  (26, 'Lillooet',  'SWE' ),
  (27, 'Mackenzie',  'NEA' ),
  (28, 'Maple Ridge',  'SWE' ),
  (29, 'Merritt',  'CTL' ),
  (30, 'Mill Bay',  'VIC'),
  (31, 'Mission',  'SWE'),
  (32, 'Nanaimo',  'VIC' ),
  (33, 'Nelson',  'SEA' ),
  (34, 'New Westminster',  'SWE' ),
  (35, 'North Vancouver',  'SWE' ),
  (36, 'Parksville',  'VIC'),
  (37, 'Penticton',  'CTL' ),
  (38, 'Port Alberni',  'VIC' ),
  (39, 'Port McNeil',  'VIC'), 
  (40, 'Prince George',  'NEA' ),
  (41, 'Qualicum Beach',  'VIC' ),
  (42, 'Quesnel',  'NEA' ),
  (43, 'Revelstoke',  'SEA' ),
  (44, 'Richmond',  'SWE' ),
  (45, 'Saanich',  'HQ' ),
  (46, 'Saanichton',  'HQ' ),
  (47, 'Salmon Arm',  'CTL' ),
  (48, 'Sechelt',  'VIC'),
  (49, 'Sidney',  'HQ' ),
  (50, 'Smithers',  'NWE' ),
  (51, 'Sorrento',  'CTL' ),
  (52, 'Surrey',  'SWE' ),
  (53, 'Terrace',  'NWE' ),
  (54, 'Ucluelet',  'VIC' ),
  (55, 'Vancouver',  'SWE' ),
  (56, 'Vernon', 'CTL'),
  (57, 'Victoria',  'HQ' ),
  (58, 'Whistler',  'SWE' ),
  (59, 'Williams Lake',  'NEA' ), 
  (60, 'Vanderhoof', 'NWE'), 
  (61, 'Sooke', 'VIC')`;

export const insertTrainingSql = `INSERT INTO public."emcr_training" ("id", "name") VALUES (1, '${ICS_TRAINING_NAME}');`;

export const insertPersonnelTrainingSql = `
INSERT INTO public."emcr_personnel_training" ("personnel_id", "training_id")
SELECT personnel_id as "personnel_id", 1 as "training_id" FROM public."emcr_personnel" WHERE status = 'ACTIVE';
`;

export const functionSql = `INSERT INTO public."emcr_function" (name,abbreviation) VALUES
	 ('Operations','Ops'),
	 ('Emergency Support Services','ESS'),
	 ('First Nations','FN'),
	 ('Finance','Fin'),
	 ('Liaison','Liaison'),
	 ('Logistics','Logs'),
	 ('Planning','Plans'),
	 ('Advanced Planning Unit','APU'),
	 ('Recovery','Recovery'),
	 ('Deputy Director','DDir');`;

export const bcwsLocations = `
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Golden','SOUTHEAST'),
	 ('Grand Forks','SOUTHEAST'),
	 ('Prince George','PRINCE_GEORGE'),
	 ('Vanderhoof','PRINCE_GEORGE'),
	 ('Fort St. James','PRINCE_GEORGE'),
	 ('MacKenzie','PRINCE_GEORGE'),
	 ('Fort St. John','PRINCE_GEORGE'),
	 ('Alexis Creek','CARIBOO'),
	 ('Quesnel','CARIBOO'),
	 ('Williams Lake','CARIBOO');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Alexis Creek','CARIBOO'),
	 ('100 Mile House','CARIBOO'),
	 ('Boston Bar','COASTAL'),
	 ('Chilliwack','COASTAL'),
	 ('Cultus Lake','COASTAL'),
	 ('Masset','COASTAL'),
	 ('Pemberton','COASTAL'),
	 ('Squamish','COASTAL'),
	 ('Powell River','COASTAL'),
	 ('Bella Coola','COASTAL');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Boston Bar','COASTAL'),
	 ('Vancouver','COASTAL'),
	 ('Chilliwack','COASTAL'),
	 ('Abbotsford','COASTAL'),
	 ('Cultus Lake','COASTAL'),
	 ('Masset','COASTAL'),
	 ('Pemberton','COASTAL'),
	 ('Squamish','COASTAL'),
	 ('Powell River','COASTAL'),
	 ('Sechelt','COASTAL');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Victoria','COASTAL'),
	 ('Duncan','COASTAL'),
	 ('Nanaimo','COASTAL'),
	 ('Port Alberni','COASTAL'),
	 ('Parksville','COASTAL'),
	 ('Campbell River','COASTAL'),
	 ('Bella Coola','COASTAL'),
	 ('Clearwater','KAMLOOPS'),
	 ('Princeton','KAMLOOPS'),
	 ('Lytton','KAMLOOPS');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Kamloops','KAMLOOPS'),
	 ('Clearwater','KAMLOOPS'),
	 ('Salmon Arm','KAMLOOPS'),
	 ('Vernon','KAMLOOPS'),
	 ('Kelowna','KAMLOOPS'),
	 ('Penticton','KAMLOOPS'),
	 ('Princeton','KAMLOOPS'),
	 ('Merritt','KAMLOOPS'),
	 ('Lytton','KAMLOOPS'),
	 ('Lillooet','KAMLOOPS');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Houston','NORTHWEST'),
	 ('Smither','NORTHWEST'),
	 ('Hazelton','NORTHWEST'),
	 ('Dease Lake','NORTHWEST'),
	 ('Atlin','NORTHWEST'),
	 ('Prince Rupert','NORTHWEST'),
	 ('Burns Lake','NORTHWEST'),
	 ('Houston','NORTHWEST'),
	 ('Smither','NORTHWEST'),
	 ('Hazelton','NORTHWEST');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Dease Lake','NORTHWEST'),
	 ('Atlin','NORTHWEST'),
	 ('Terrace','NORTHWEST'),
	 ('Prince Rupert','NORTHWEST'),
	 ('Valemount','PRINCE_GEORGE'),
	 ('Blue River','PRINCE_GEORGE'),
	 ('Chetwynd','PRINCE_GEORGE'),
	 ('Valemount','PRINCE_GEORGE'),
	 ('Blue River','PRINCE_GEORGE'),
	 ('Dawson Creek','PRINCE_GEORGE');
INSERT INTO public.bcws_location (location_name,fire_centre) VALUES
	 ('Chetwynd','PRINCE_GEORGE'),
	 ('Fort Nelson','PRINCE_GEORGE'),
	 ('Invermere','SOUTHEAST'),
	 ('Nakusp','SOUTHEAST'),
	 ('Cranbrook','SOUTHEAST'),
	 ('Kimberley','SOUTHEAST'),
	 ('Invermere','SOUTHEAST'),
	 ('Nelson','SOUTHEAST'),
	 ('Nakusp','SOUTHEAST'),
	 ('Castelgar','SOUTHEAST');


`;
