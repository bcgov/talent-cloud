import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDivisionMigration1717438866103 implements MigrationInterface {
    name = 'RemoveDivisionMigration1717438866103'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "personnel" ADD "ministry" "public"."ministry"`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "division" character varying(100)`);


        await queryRunner.query(`
          update
            personnel
          set
            ministry = (
            select
              ministry
            from
              division
            join  
                      bcws_personnel 
                    on
              division.id = bcws_personnel.division_id
            where
              bcws_personnel.personnel_id = personnel.id)
          where
            ministry is null
        `);
            
        await queryRunner.query(`
          update
            personnel
          set
            division = (
            select
              division_name
            from
              bcws_personnel
            join division on
              division.id = bcws_personnel.division_id
            where
              bcws_personnel.personnel_id = personnel.id)
        `); 

        await queryRunner.query(`
          Update personnel set ministry = (select ministry
            from
              emcr_personnel
            where 
              emcr_personnel.personnel_id = personnel.id)      
          where ministry is null
        `);

        await queryRunner.query(`alter table emcr_personnel drop column ministry;`)
        await queryRunner.query(`alter table bcws_personnel drop column division_id;`)
        await queryRunner.query(`ALTER TABLE "personnel" ADD "supervisor_phone" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" SET NOT NULL`);
        await queryRunner.query(`DROP table division CASCADE`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "division" ("id" SERIAL NOT NULL, "division_name" character varying(250) NOT NULL, "ministry" "public"."ministry" NOT NULL, CONSTRAINT "PK_b6f0d207e38106dbddabab3a078" PRIMARY KEY ("id"))`,
      );
      await queryRunner.query(`
      INSERT into public.division (id, division_name, ministry) 
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
      `);
      
      await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "supervisor_phone"`);
      await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "division_id" int`);
      await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD "ministry" "public"."ministry" `);

      await queryRunner.query(`Update emcr_personnel set ministry = (select
            ministry
          from
              personnel
          where personnel.id = emcr_personnel.personnel_id)      
        `);
        
        await queryRunner.query(`
          update
            bcws_personnel
          set
            division_id = (
            select
              division.id
            from
              division
            join personnel on
              division.division_name = personnel.division
              and personnel.ministry = division.ministry
            where
              personnel.id = bcws_personnel.personnel_id
            limit 1)
        `);

        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "division"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "ministry"`);

    }

}
