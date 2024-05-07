import { ICS_TRAINING_NAME } from '../common/const';

export const locationSql = `INSERT INTO public."emcr_location" (id, location_name, region) 
  VALUES
  (1, '100 Mile House',  'NEA' ),
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

export const bcwsLocationsSql = `
   INSERT INTO public.bcws_location (id, location_name,fire_centre) VALUES
   (1, 'Alexis Creek','CARIBOO'),
   (2, 'Quesnel','CARIBOO'),
   (3,'Williams Lake','CARIBOO'),
   (4,'Boston Bar','COASTAL'),
   (5,'Vancouver','COASTAL'),
   (6,'Chilliwack','COASTAL'),
   (7,'Abbotsford','COASTAL'),
   (8, 'Cultus Lake','COASTAL'),
   (9, 'Masset','COASTAL'),
   (10, 'Pemberton','COASTAL'),
   (11, 'Squamish','COASTAL'),
   (12, 'Powell River','COASTAL'),
   (13, 'Sechelt','COASTAL'),
   (14, 'Victoria','COASTAL'),
   (15, 'Duncan','COASTAL'),
   (16, 'Nanaimo','COASTAL'),
   (17, 'Port Alberni','COASTAL'),
   (18, 'Parksville','COASTAL'),
   (19, 'Campbell River','COASTAL'),
   (20, 'Bella Coola','COASTAL'),
   (21, 'Kamloops','KAMLOOPS'),
   (22, 'Clearwater','KAMLOOPS'),
   (23, 'Salmon Arm','KAMLOOPS'),
   (24, 'Vernon','KAMLOOPS'),
   (25, 'Kelowna','KAMLOOPS'),
   (26, 'Penticton','KAMLOOPS'),
   (27, 'Princeton','KAMLOOPS'),
   (28, 'Merritt','KAMLOOPS'),
   (29, 'Lytton','KAMLOOPS'),
   (30, 'Lillooet','KAMLOOPS'),
   (31, 'Houston','NORTHWEST'),
   (32, 'Smithers','NORTHWEST'),
   (33, 'Hazelton','NORTHWEST'),
   (34, 'Dease Lake','NORTHWEST'),
   (35, 'Atlin','NORTHWEST'),
   (36, 'Prince Rupert','NORTHWEST'),
   (37, 'Burns Lake','NORTHWEST'),
   (38, 'Terrace','NORTHWEST'),
   (39, 'Valemount','PRINCE_GEORGE'),
   (40, 'Blue River','PRINCE_GEORGE'),
   (41, 'Dawson Creek','PRINCE_GEORGE'),
   (42, 'Chetwynd','PRINCE_GEORGE'),
   (43, 'Fort Nelson','PRINCE_GEORGE'),
   (44, 'Prince George','PRINCE_GEORGE'),
   (45, 'Vanderhoof','PRINCE_GEORGE'),
   (46, 'Fort St. James','PRINCE_GEORGE'),
   (47, 'MacKenzie','PRINCE_GEORGE'),
   (48, 'Fort St. John','PRINCE_GEORGE'),
   (49, 'Invermere','SOUTHEAST'),
   (50, 'Cranbrook','SOUTHEAST'),
   (51, 'Kimberley','SOUTHEAST'),
   (52, 'Nelson','SOUTHEAST'),
   (53, 'Nakusp','SOUTHEAST'),
   (54, 'Castelgar','SOUTHEAST'),
   (55, 'Golden','SOUTHEAST'),
   (56, 'Grand Forks','SOUTHEAST');
   `;

export const rolesSql = `INSERT INTO public.bcws_role (id,"name","section") VALUES
	 (1,'DEMOBILIZATION_UNIT_LEADER','PLANNING'),
	 (2,'DOCUMENTATION_UNIT_LEADER','PLANNING'),
	 (3,'FIRE_BEHAVIOUR_SPECIALIST','PLANNING'),
	 (4,'GIS_SPECIALIST','PLANNING'),
	 (5,'PLANNING_ASSISTANT','PLANNING'),
	 (6,'PLANNING_ASSISTANT','PLANNING'),
	 (7,'PLANS_OFFICER','PLANNING'),
	 (8,'PLANS_SECTION_CHIEF','PLANNING'),
	 (9,'REHAB_SPECIALIST','PLANNING'),
	 (10,'RESOURCE_UNIT_LEADER','PLANNING'),
	 (11,'SITUATION_UNIT_LEADER','PLANNING'),
	 (12,'ASSET_MANAGEMENT','LOGISTICS'),
	 (13,'CAMP_MANAGER','LOGISTICS'),
	 (14,'COMMUNICATION_UNIT_LEADER','LOGISTICS'),
	 (15,'CONTRACT_MONITOR','LOGISTICS'),
	 (16,'DISPATCHER','LOGISTICS'),
	 (17,'FACILITIES_UNIT_LEADER','LOGISTICS'),
	 (18,'FOOD_UNIT_LEADER','LOGISTICS'),
	 (19,'GROUND_SUPPORT_UNIT_LEADER','LOGISTICS'),
	 (20,'LOGISTICS_ASSISTANT','LOGISTICS'),
	 (21,'LIAISON_OFFICER','LOGISTICS'),
	 (22,'LOGISTICS_SECTION_CHIEF','LOGISTICS'),
	 (23,'MEDICAL_UNIT_LEADER','LOGISTICS'),
	 (24,'SERVICE_BRANCH_DIRECTOR','LOGISTICS'),
	 (25,'SUPPLY_UNIT_LEADER','LOGISTICS'),
	 (26,'SUPPORT_BRANCH_DIRECTOR','LOGISTICS'),
	 (27,'WAREHOUSE_MANAGER','LOGISTICS'),
	 (28,'ACCOUNTS_PAYABLE','FINANCE_ADMIN'),
	 (29,'COMPENSATION_CLAIMS_UNIT_LEADER','FINANCE_ADMIN'),
	 (30,'CONTRACT_ADMINISTRATION','FINANCE_ADMIN'),
	 (31,'COST_UNIT_LEADER','FINANCE_ADMIN'),
	 (32,'FINANCE_ASSISTANT','FINANCE_ADMIN'),
	 (33,'FINANCE_LIAISON','FINANCE_ADMIN'),
	 (34,'FINANCE_OFFICER','FINANCE_ADMIN'),
	 (35,'FINANCE_SECTION_CHIEF','FINANCE_ADMIN'),
	 (36,'PROCUREMENT_UNIT_LEADER','FINANCE_ADMIN'),
	 (37,'TIME_RECORDER','FINANCE_ADMIN'),
	 (38,'TIME_UNIT_LEADER','FINANCE_ADMIN'),
	 (39,'DIVISION_SUPERVISOR','OPERATIONS'),
	 (40,'EQUIPMENT_BRANCH_DIRECTOR','OPERATIONS'),
	 (41,'EQUIPMENT_GROUP_SUPERVISOR','OPERATIONS'),
	 (42,'LINE_LOCATOR','OPERATIONS'),
	 (43,'STRIKE_TEAM_LEADER','OPERATIONS'),
	 (44,'TASK_FORCE_LEADER','OPERATIONS'),
	 (45,'INFORMATION_ASSISTANT','COMMAND'),
	 (46,'INFORMATION_OFFICER','COMMAND'),
	 (47,'LIAISON_OFFICER','COMMAND'),
	 (48,'SAFETY_OFFICER','COMMAND'),
	 (49,'AVIATION_ASSISTANT','AVIATION'),
	 (50,'HELI_COORDINATOR','AVIATION'),
	 (51,'HELIBASE_MANAGER','AVIATION');`;

export const certsSql = `insert into bcws_certification (id, name) values 
        (1, 'Forklift - Certified'),
        (2, 'Psychological First Aid (PFA)'),
        (3, 'Radio Operator'),
        (4, 'Volunteer Fire Dept'),
        (5, 'Quad/ATV'),
        (6, 'Food Safe Level I'),
        (7, 'Food Safe Level II'),
        (8, 'OFA I'),
        (9, 'OFA II'),
        (10, 'OFA III')
        `;

export const toolsSql = `insert into bcws_tools (id,  name)
        values
        (1, 'ADOBE'),
        (2, 'CAS'),
        (3, 'DEC'),
        (4, 'EXCEL'),
        (5, 'FACE'),
        (6, 'IMIS'),
        (7, 'RRT'),
        (8, 'VISIO')`;

export const divisionsSql = `	INSERT into public.divisions (id, name, ministry) 
          VALUES
           (1,'Office of the Chief Forester','FOR'),
                 (2,'Integrated Resource Operations Division','FOR'),
                 (3,'Timber, Range, and Economics','FOR'),
                 (4,'Forest Resiliency and Archaeology','FOR'),
                 (5,'North Area','FOR'),
                 (6,'South Area','FOR'),
                 (7,'Coast Area','FOR'),
                 (8,'BC Timber Sales','FOR'),
                 (9,'BC Wildfire','FOR'),
                 (10,'Land Use Planning and Cumulative Effects','WLRS'),
                 (11,'Resource Stewardship','WLRS'),
                 (12,'Water, Fisheries and Coast','WLRS'),
                 (13,'Reconciliation, Lands and Natural Resource Policy','WLRS'),
                 (14,'Permitting Transformation','WLRS'),
                 (15,'Natural Resource Information and Digital Services','WLRS'),
                 (16,'Corporate Services for Natural Resource Ministries ','WLRS'),
                 (17,'Conservation and Recreation Division','ENV'),
                 (18,'Recreation Strategy and Service Transformation','ENV'),
                 (19,'Climate Action Secretariat','ENV'),
                 (20,'Environmental Protection Division','ENV'),
                 (21,'Strategic Services Division','ENV'),
                 (22,'Deputy Minister''s Office','AF'),
                 (23,'Agriculture Resource Division','AF'),
                 (24,'Science, Policy, and Inspection Division','AF'),
                 (25,'Climate Resilience, Competitiveness and Reconciliation Division','AF'),
                 (26,'Corporate Management Services ','AG'),
                 (27,'Information Systems','AG'),
                 (28,'BC Prosecution Service','AG'),
                 (29,'Court Services Branch','AG'),
                 (30,'Independent Investigations Office','AG'),
                 (31,'Investigation and Standards Office','AG'),
                 (32,'Justice Services Branch','AG'),
                 (33,'Legal Services Branch','AG'),
                 (34,'Multiculturalism and Anti-Racism Branch','AG'),
                 (35,'BC Corrections','PSSG'),
                 (36,'BC Coroners Service','PSSG'),
                 (37,'Cannabis, Consumer Protection and Corporate Policy Branch','PSSG'),
                 (38,'Community Safety and Crime Prevention','PSSG'),
                 (39,'Gaming Policy and Enforcement Branch','PSSG'),
                 (40,'Liquor and Cannabis Regulation Branch','PSSG'),
                 (41,'Office of the Fire Commissioner','PSSG'),
                 (42,'Policing and Security','PSSG'),
                 (43,'RoadSafetyBC','PSSG'),
                 (44,'Deputy Minister''s Office','MCF'),
                 (45,'Information Services ','MCF'),
                 (46,'Service Delivery Division','MCF'),
                 (47,'Strategic Integration, Policy & Legislation Division','MCF'),
                 (48,'Partnership & Indigenous Engagement','MCF'),
                 (49,'Finance & Corporate Services','MCF'),
                 (50,'Strategic Services Division','MCF'),
                 (51,'Office of the Provincial Director & Aboriginal Services','MCF'),
                 (52,'Deputy Minister''s Office','CITZ'),
                 (53,'BC Data Service','CITZ'),
                 (54,'Connectivity','CITZ'),
                 (55,'Corporate Services','CITZ'),
                 (56,'Deal Management Office','CITZ'),
                 (57,'Government Digital Experience','CITZ'),
                 (58,'OCIO - Government Chief Information Officer','CITZ'),
                 (59,'OCIO - Corporate Information and Records Management Office','CITZ'),
                 (60,'OCIO - Enterprise Services','CITZ'),
                 (61,'Procurement and Supply','CITZ'),
                 (62,'Real Property','CITZ'),
                 (63,'Service BC','CITZ'),
                 (64,'Deputy Minister''s Office','ECC'),
                 (65,'Child care','ECC'),
                 (66,'Education Programs','ECC'),
                 (67,'Governance and Analytics','ECC'),
                 (68,'Learning','ECC'),
                 (69,'Resource Management ','ECC'),
                 (70,'Services & Technology','ECC'),
                 (71,'DMO and Associate DMO','EMCR'),
                 (72,'Corporate Services ','EMCR'),
                 (73,'Disaster Recovery ','EMCR'),
                 (74,'Disaster Risk Management','EMCR'),
                 (75,'Partnerships, Engagement and Legislation','EMCR'),
                 (76,'Regional Operations','EMCR'),
                 (77,'Deputy Minister''s Office','EMLI'),
                 (78,'Electricity and Utility Regulation Division','EMLI'),
                 (79,'Energy Decarbonization Division','EMLI'),
                 (80,'Energy Resources Division','EMLI'),
                 (81,'Responsible Mining and Competitiveness Division','EMLI'),
                 (82,'Mines Health, Safety & Enforcement Division','EMLI'),
                 (83,'Strategic and Indigenous Partnerships Division','EMLI'),
                 (84,'Corporate Services','FIN'),
                 (85,'Gender Equity Office','FIN'),
                 (86,'Office of the Comptroller General','FIN'),
                 (87,'Policy & Legislation Division','FIN'),
                 (88,'Provincial Treasury','FIN'),
                 (89,'Revenue Division and Anti-Money Laundering Secretariat','FIN'),
                 (90,'Treasury Board Staff','FIN'),
                 (91,'Deputy Minister''s Office','FIN'),
                 (92,'Deputy Minister''s Office (DMO)','HLTH'),
                 (93,'Associate Deputy Minister''s Offices','HLTH'),
                 (94,'Finance and Corporate Services','HLTH'),
                 (95,'Health Sector Information, Analysis and Reporting','HLTH'),
                 (96,'Health Sector Information Management / Information Technology','HLTH'),
                 (97,'Health Sector Workforce and Beneficiary Services','HLTH'),
                 (98,'Hospital and Provincial Health Services','HLTH'),
                 (99,'Mental Health and Substance Use','HLTH'),
                 (100,'Office of the Provincial Health Officer','HLTH'),
                 (101,'Office of the Seniors Advocate','HLTH'),
                 (102,'Pharmaceutical, Laboratory and Blood Services','HLTH'),
                 (103,'Population and Public Health','HLTH'),
                 (104,'Primary Care','HLTH'),
                 (105,'Seniors'' Services','HLTH'),
                 (106,'Strategic Innovation','HLTH'),
                 (107,'Strategy Management and People Office','HLTH'),
                 (108,'Deputy Minister''s Office','HOUS'),
                 (109,'Housing and Land Use Policy','HOUS'),
                 (110,'Homelessness, Partnerships and Housing Supports','HOUS'),
                 (111,'Strategy, Governance and Accountability ','HOUS'),
                 (112,'Housing Innovations','HOUS'),
                 (113,'Deputy Minister''s Office','IRR'),
                 (114,'Negotiations & Regional Operations Division','IRR'),
                 (115,'Reconciliation Transformation & Strategies Division','IRR'),
                 (116,'Strategic Partnerships & Initiatives Division','IRR'),
                 (117,'Sustainable Economy','JEDI'),
                 (118,'Investment Division','JEDI'),
                 (119,'Small Business and Economic Development','JEDI'),
                 (120,'Trade and Industry Development Division','JEDI'),
                 (121,'Employment Standards','LBR'),
                 (122,'Policy & Legislation','LBR'),
                 (123,'Labour Division','LBR'),
                 (124,'Deputy Minister''s Office','MMHA'),
                 (125,'Corporate Services','MMHA'),
                 (126,'Child, Youth & mental Health Policy','MMHA'),
                 (127,'Provincial Support Office','MMHA'),
                 (128,'Substance Use Policy','MMHA'),
                 (129,'Treatment & recovery','MMHA'),
                 (130,'Deputy Minister''s Office','MUNI'),
                 (131,'Immigration Services and Strategic Planning','MUNI'),
                 (132,'EFO Management Services','MUNI'),
                 (133,'Local Government','MUNI'),
                 (134,'Deputy Minister''s Office','PSFS'),
                 (135,'Finance, Technology & Management Services','PSFS'),
                 (136,'Post-Secondary Policy & Programs','PSFS'),
                 (137,'Labour Market Development','PSFS'),
                 (138,'Governance, Legislation & Engagement','PSFS'),
                 (139,'Employment & Labour Market Services','SDPR'),
                 (140,'Corporate Services','SDPR'),
                 (141,'Research, Innovation and Policy ','SDPR'),
                 (142,'Service Delivery','SDPR'),
                 (143,'Accessibility Directorate','SDPR'),
                 (144,'Tourism Sector Strategy','TACS'),
                 (145,'Arts and Culture','TACS'),
                 (146,'Sport and Creative','TACS'),
                 (147,'Management Services Division','TACS'),
                 (148,'Deputy Minister''s Office','MOTI'),
                 (149,'Associate Deputy Ministers','MOTI'),
                 (150,'Highways and Regional Services Division','MOTI'),
                 (151,'Highways and Regional Services Division: South Coast Region','MOTI'),
                 (152,'Highways and Regional Services Division: Southern Interior Region','MOTI'),
                 (153,'Highways and Regional Services Division: Northern Region','MOTI'),
                 (154,'Policy, Programs and Partnerships Division','MOTI'),
                 (155,'Integrated Transportation and Infrastructure Services Division','MOTI'),
                 (156,'Strategic and Corporate Priorities Division','MOTI'),
                 (157,'Finance and Risk Management Division','MOTI');
        `;

export const joinedLocations = `INSERT INTO public.joined_location (id,fire_centre,emcr_region,location_name) VALUES
	 (28,'CARIBOO','NEA','Williams Lake'),
	 (20,'CARIBOO','NEA','Quesnel'),
	 (62,'CARIBOO',NULL,'Alexis Creek'),
	 (27,'COASTAL','HQ','Victoria'),
	 (25,'COASTAL','SWE','Vancouver'),
	 (1,'COASTAL','SWE','Abbotsford'),
	 (18,'COASTAL','VIC','Port Alberni'),
	 (14,'COASTAL','VIC','Nanaimo'),
	 (3,'COASTAL','VIC','Campbell River'),
	 (6,'COASTAL','VIC','Duncan'),
	 (22,'COASTAL','VIC','Sechelt'),
	 (16,'COASTAL','VIC','Parksville'),
	 (63,'COASTAL',NULL,'Boston Bar'),
	 (70,'COASTAL',NULL,'Bella Coola'),
	 (69,'COASTAL',NULL,'Powell River'),
	 (68,'COASTAL',NULL,'Squamish'),
	 (67,'COASTAL',NULL,'Pemberton'),
	 (66,'COASTAL',NULL,'Masset'),
	 (65,'COASTAL',NULL,'Cultus Lake'),
	 (64,'COASTAL',NULL,'Chilliwack'),
	 (21,'KAMLOOPS','CTL','Salmon Arm'),
	 (9,'KAMLOOPS','CTL','Kamloops'),
	 (26,'KAMLOOPS','CTL','Vernon'),
	 (13,'KAMLOOPS','CTL','Merritt'),
	 (17,'KAMLOOPS','CTL','Penticton'),
	 (10,'KAMLOOPS','CTL','Kelowna'),
	 (12,'KAMLOOPS','SWE','Lillooet'),
	 (73,'KAMLOOPS',NULL,'Lytton'),
	 (71,'KAMLOOPS',NULL,'Clearwater'),
	 (72,'KAMLOOPS',NULL,'Princeton'),
	 (23,'NORTHWEST','NWE','Smithers'),
	 (24,'NORTHWEST','NWE','Terrace'),
	 (2,'NORTHWEST','NWE','Burns Lake'),
	 (77,'NORTHWEST',NULL,'Atlin'),
	 (74,'NORTHWEST',NULL,'Houston'),
	 (75,'NORTHWEST',NULL,'Hazelton'),
	 (76,'NORTHWEST',NULL,'Dease Lake'),
	 (78,'NORTHWEST',NULL,'Prince Rupert'),
	 (8,'PRINCE_GEORGE','NEA','Fort Nelson'),
	 (7,'PRINCE_GEORGE','NEA','Fort St. John'),
	 (5,'PRINCE_GEORGE','NEA','Dawson Creek'),
	 (19,'PRINCE_GEORGE','NEA','Prince George'),
	 (29,'PRINCE_GEORGE','NWE','Vanderhoof'),
	 (82,'PRINCE_GEORGE',NULL,'Fort St. James'),
	 (81,'PRINCE_GEORGE',NULL,'Chetwynd'),
	 (80,'PRINCE_GEORGE',NULL,'Blue River'),
	 (79,'PRINCE_GEORGE',NULL,'Valemount'),
	 (83,'PRINCE_GEORGE',NULL,'MacKenzie'),
	 (4,'SOUTHEAST','SEA','Cranbrook'),
	 (15,'SOUTHEAST','SEA','Nelson'),
	 (11,'SOUTHEAST','SEA','Kimberley'),
	 (85,'SOUTHEAST',NULL,'Nakusp'),
	 (88,'SOUTHEAST',NULL,'Grand Forks'),
	 (84,'SOUTHEAST',NULL,'Invermere'),
	 (87,'SOUTHEAST',NULL,'Golden'),
	 (86,'SOUTHEAST',NULL,'Castelgar'),
	 (32,NULL,'HQ','Brentwood Bay'),
	 (41,NULL,'HQ','Esquimalt'),
	 (42,NULL,'HQ','Langford'),
	 (54,NULL,'HQ','Saanich'),
	 (55,NULL,'HQ','Saanichton'),
	 (56,NULL,'HQ','Sidney'),
	 (40,NULL,'CTL','Enderby'),
	 (57,NULL,'CTL','Sorrento'),
	 (44,NULL,'NEA','Mackenzie'),
	 (31,NULL,'NEA','150 Mile House'),
	 (30,NULL,'NEA','100 Mile House'),
	 (39,NULL,'SEA','Elkford'),
	 (34,NULL,'SEA','Bonnington Falls'),
	 (35,NULL,'SEA','Castlegar'),
	 (52,NULL,'SEA','Revelstoke'),
	 (53,NULL,'SWE','Richmond'),
	 (45,NULL,'SWE','Maple Ridge'),
	 (49,NULL,'SWE','North Vancouver'),
	 (48,NULL,'SWE','New Westminster'),
	 (47,NULL,'SWE','Mission'),
	 (37,NULL,'SWE','Coquitlam'),
	 (60,NULL,'SWE','Whistler'),
	 (33,NULL,'SWE','Burnaby'),
	 (58,NULL,'SWE','Surrey'),
	 (43,NULL,'SWE','Langley'),
	 (38,NULL,'VIC','Courtenay'),
	 (61,NULL,'VIC','Sooke'),
	 (59,NULL,'VIC','Ucluelet'),
	 (51,NULL,'VIC','Qualicum Beach'),
	 (50,NULL,'VIC','Port McNeil'),
	 (46,NULL,'VIC','Mill Bay'),
	 (36,NULL,'VIC','Cumberland')`;
