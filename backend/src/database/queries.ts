import { ICS_TRAINING_NAME } from '../common/const';

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
	 ('Deputy Director','DDir'),
	 ('Response Information', 'Response');`;

export const rolesSql = `INSERT INTO public.bcws_role (id,"name","section") VALUES
	 (1,'DEMOBILIZATION_UNIT_LEADER','PLANNING'),
	 (2,'DOCUMENTATION_UNIT_LEADER','PLANNING'),
	 (3,'FIRE_BEHAVIOUR_SPECIALIST','PLANNING'),
	 (4,'GIS_SPECIALIST','PLANNING'),
	 (5,'PLANNING_ASSISTANT','PLANNING'),
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
	 (21,'LOGISTICS_OFFICER','LOGISTICS'),
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

export const certsSql = `insert into certification (id, name) values 
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

export const toolsSql = `insert into tools (id,  name)
        values
        (1, 'ADOBE'),
        (2, 'CAS'),
        (3, 'DEC'),
        (4, 'EXCEL'),
        (5, 'FACE'),
        (6, 'IMIS'),
        (7, 'RRT'),
        (8, 'VISIO')`;

//TODO Update this when we have all of the fire centres/regions
export const joinedLocationsSql = `INSERT INTO public."location" (id,location_name,region,fire_centre) VALUES
(62,'Alexis Creek','NEA','CARIBOO'),
(63,'Bella Coola','VIC','COASTAL'),
(64,'Boston Bar','SWE','COASTAL'),
(65,'Chilliwack','SWE','COASTAL'),
(66,'Cultus Lake','SWE','COASTAL'),
(67,'Masset','NWE','COASTAL'),
(68,'Pemberton','SWE','COASTAL'),
(69,'Powell River','VIC','COASTAL'),
(70,'Squamish','SWE','COASTAL'),
(71,'Clearwater','CTL','KAMLOOPS'),
(72,'Lytton','SWE','KAMLOOPS'),
(73,'Princeton','CTL','KAMLOOPS'),
(74,'Atlin','NWE','NORTHWEST'),
(75,'Dease Lake','NWE','NORTHWEST'),
(76,'Hazelton','NWE','NORTHWEST'),
(77,'Houston','NWE','NORTHWEST'),
(78,'Prince Rupert','NWE','NORTHWEST'),
(42,'Quesnel','NEA','CARIBOO'),
(59,'Williams Lake','NEA','CARIBOO'),
(57,'Victoria','HQ','COASTAL'),
(3,'Abbotsford','SWE','COASTAL'),
(55,'Vancouver','SWE','COASTAL'),
(8,'Campbell River','VIC','COASTAL'),
(15,'Duncan','VIC','COASTAL'),
(32,'Nanaimo','VIC','COASTAL'),
(36,'Parksville','VIC','COASTAL'),
(38,'Port Alberni','VIC','COASTAL'),
(48,'Sechelt','VIC','COASTAL'),
(21,'Kamloops','CTL','KAMLOOPS'),
(22,'Kelowna','CTL','KAMLOOPS'),
(29,'Merritt','CTL','KAMLOOPS'),
(37,'Penticton','CTL','KAMLOOPS'),
(47,'Salmon Arm','CTL','KAMLOOPS'),
(56,'Vernon','CTL','KAMLOOPS'),
(26,'Lillooet','SWE','KAMLOOPS'),
(6,'Burns Lake','NWE','NORTHWEST'),
(50,'Smithers','NWE','NORTHWEST'),
(53,'Terrace','NWE','NORTHWEST'),
(14,'Dawson Creek','NEA','PRINCE_GEORGE'),
(20,'Fort Nelson','NEA','PRINCE_GEORGE'),
(19,'Fort St. John','NEA','PRINCE_GEORGE'),
(40,'Prince George','NEA','PRINCE_GEORGE'),
(60,'Vanderhoof','NWE','PRINCE_GEORGE'),
(13,'Cranbrook','SEA','SOUTHEAST'),
(23,'Kimberley','SEA','SOUTHEAST'),
(33,'Nelson','SEA','SOUTHEAST'),
(17,'Enderby','CTL','KAMLOOPS'),
(51,'Sorrento','CTL','KAMLOOPS'),
(4,'Brentwood Bay','HQ','COASTAL'),
(18,'Esquimalt','HQ','COASTAL'),
(24,'Langford','HQ','COASTAL'),
(45,'Saanich','HQ','COASTAL'),
(46,'Saanichton','HQ','COASTAL'),
(49,'Sidney','HQ','COASTAL'),
(1,'100 Mile House','NEA','CARIBOO'),
(2,'150 Mile House','NEA','CARIBOO'),
(27,'Mackenzie','NEA','PRINCE_GEORGE'),
(7,'Bonnington Falls','SEA','SOUTHEAST'),
(9,'Castlegar','SEA','SOUTHEAST'),
(16,'Elkford','SEA','SOUTHEAST'),
(79,'Blue River','CTL','PRINCE_GEORGE'),
(80,'Chetwynd','NEA','PRINCE_GEORGE'),
(81,'Fort St. James','NEA','PRINCE_GEORGE'),
(82,'Valemount','NEA','PRINCE_GEORGE'),
(83,'Golden','SEA','SOUTHEAST'),
(84,'Grand Forks','SEA','SOUTHEAST'),
(85,'Invermere','SEA','SOUTHEAST'),
(86,'Nakusp','SEA','SOUTHEAST'),
(43,'Revelstoke','SEA','SOUTHEAST'),
(5,'Burnaby','SWE','COASTAL'),
(11,'Coquitlam','SWE','COASTAL'),
(25,'Langley','SWE','COASTAL'),
(28,'Maple Ridge','SWE','COASTAL'),
(31,'Mission','SWE','COASTAL'),
(34,'New Westminster','SWE','COASTAL'),
(35,'North Vancouver','SWE','COASTAL'),
(44,'Richmond','SWE','COASTAL'),
(52,'Surrey','SWE','COASTAL'),
(58,'Whistler','SWE','COASTAL'),
(12,'Courtenay','VIC','COASTAL'),
(10,'Cumberland','VIC','COASTAL'),
(30,'Mill Bay','VIC','COASTAL'),
(39,'Port McNeil','VIC','COASTAL'),
(41,'Qualicum Beach','VIC','COASTAL'),
(61,'Sooke','VIC','COASTAL'),
(54,'Ucluelet','VIC','COASTAL'),
(89, 'Telkwa', 'NWE', 'NORTHWEST'),
(90,'Anahim Lake', 'NWE', 'CARIBOO')
;`;
