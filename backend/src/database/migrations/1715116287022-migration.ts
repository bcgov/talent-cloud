// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Migration1715116287022 implements MigrationInterface {
//     name = 'Migration1715116287022'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_4497c09d4ea63c7187360afc685"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_874eebc6d744a86c688612247c5"`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3"`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f"`);
//         await queryRunner.query(`ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7"`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_76f15321aa16f18c7373d701861"`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34"`);
//         await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "region"`);
//         await queryRunner.query(`DROP TYPE "public"."region"`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" DROP COLUMN "emcr_region"`);
//         await queryRunner.query(`DROP TYPE "public"."region"`);
//         await queryRunner.query(`CREATE TYPE "public"."emcr-region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "location" ADD "emcr_region" "public"."emcr-region"`);
//         await queryRunner.query(`ALTER TABLE "location" ADD "fire_centre" "public"."fire-centre"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "division_id" integer`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "UQ_82d10a9214cb76928b89eca527a" UNIQUE ("division_id")`);
//         await queryRunner.query(`ALTER TABLE "division" DROP COLUMN "division_name"`);
//         await queryRunner.query(`ALTER TABLE "division" ADD "division_name" character varying(50) NOT NULL`);
//         await queryRunner.query(`ALTER TYPE "public"."region" RENAME TO "region_old"`);
//         await queryRunner.query(`CREATE TYPE "public"."emcr-region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "work_region" TYPE "public"."emcr-region" USING "work_region"::"text"::"public"."emcr-region"`);
//         await queryRunner.query(`DROP TYPE "public"."region_old"`);
//         await queryRunner.query(`ALTER TYPE "public"."region" RENAME TO "region_old"`);
//         await queryRunner.query(`CREATE TYPE "public"."emcr-region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_region" TYPE "public"."emcr-region" USING "home_region"::"text"::"public"."emcr-region"`);
//         await queryRunner.query(`DROP TYPE "public"."region_old"`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" DROP CONSTRAINT "UQ_FC_LOCATION"`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" ALTER COLUMN "fire_centre" SET NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" ADD CONSTRAINT "UQ_FC_LOCATION" UNIQUE ("location_name", "fire_centre")`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_874eebc6d744a86c688612247c5" FOREIGN KEY ("work_fire_centre") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_4497c09d4ea63c7187360afc685" FOREIGN KEY ("home_fire_centre") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_82d10a9214cb76928b89eca527a" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","emcr_region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","emcr_region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3"`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_82d10a9214cb76928b89eca527a"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_4497c09d4ea63c7187360afc685"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_874eebc6d744a86c688612247c5"`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" DROP CONSTRAINT "UQ_FC_LOCATION"`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" ALTER COLUMN "fire_centre" DROP NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" ADD CONSTRAINT "UQ_FC_LOCATION" UNIQUE ("location_name", "fire_centre")`);
//         await queryRunner.query(`CREATE TYPE "public"."region_old" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_region" TYPE "public"."region_old" USING "home_region"::"text"::"public"."region_old"`);
//         await queryRunner.query(`DROP TYPE "public"."emcr-region"`);
//         await queryRunner.query(`ALTER TYPE "public"."region_old" RENAME TO "region"`);
//         await queryRunner.query(`CREATE TYPE "public"."region_old" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "work_region" TYPE "public"."region_old" USING "work_region"::"text"::"public"."region_old"`);
//         await queryRunner.query(`DROP TYPE "public"."emcr-region"`);
//         await queryRunner.query(`ALTER TYPE "public"."region_old" RENAME TO "region"`);
//         await queryRunner.query(`ALTER TABLE "division" DROP COLUMN "division_name"`);
//         await queryRunner.query(`ALTER TABLE "division" ADD "division_name" character varying(250) NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP CONSTRAINT "UQ_82d10a9214cb76928b89eca527a"`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "division_id"`);
//         await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "fire_centre"`);
//         await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "emcr_region"`);
//         await queryRunner.query(`DROP TYPE "public"."emcr-region"`);
//         await queryRunner.query(`CREATE TYPE "public"."region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "bcws_location" ADD "emcr_region" "public"."region"`);
//         await queryRunner.query(`CREATE TYPE "public"."region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`);
//         await queryRunner.query(`ALTER TABLE "location" ADD "region" "public"."region" NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_76f15321aa16f18c7373d701861" FOREIGN KEY ("training_id") REFERENCES "emcr_training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f" FOREIGN KEY ("work_location", "work_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_874eebc6d744a86c688612247c5" FOREIGN KEY ("work_fire_centre") REFERENCES "bcws_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_4497c09d4ea63c7187360afc685" FOREIGN KEY ("home_fire_centre") REFERENCES "bcws_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

// }
