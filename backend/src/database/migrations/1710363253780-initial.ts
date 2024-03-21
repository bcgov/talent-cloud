import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1710363253780 implements MigrationInterface {
  name = 'InitialMigration1710363253780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "function" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "abbreviation" character varying(10) NOT NULL, CONSTRAINT "PK_6e085d059b4227aab09e8a5b05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."availability-type" AS ENUM('UNAVAILABLE', 'DEPLOYED', 'AVAILABLE', 'NOT_INDICATED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "availability" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT '2024-03-13', "availability_type" "public"."availability-type" NOT NULL DEFAULT 'NOT_INDICATED', "deployment_code" character varying, "personnel" uuid, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("id" SERIAL, "location_name" character varying(100), "region" "public"."region" NOT NULL, CONSTRAINT "UQ_9b2e88233cc89fe5a7c1c648c59" UNIQUE ("location_name"), CONSTRAINT "UQ_location" UNIQUE ("location_name", "region"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."experience" AS ENUM('INTERESTED', 'EXPERIENCED', 'CHIEF_EXPERIENCED', 'OUTSIDE_EXPERIENCED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "personnel_function_experience" ("personnel_id" uuid NOT NULL, "function_id" integer NOT NULL, "experience_type" "public"."experience" NOT NULL, CONSTRAINT "PK_ea23826f97ea6958cac2265c4bb" PRIMARY KEY ("personnel_id", "function_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "form" ("id" SERIAL NOT NULL, "submissionId" character varying NOT NULL, "formId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ministry" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."personnel_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."union_membership" AS ENUM('BCGEU', 'EXCLUDED', 'PEA')`,
    );
    await queryRunner.query(
      `CREATE TABLE "personnel" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "date_joined" date, "ministry" "public"."ministry" NOT NULL, "primary_phone" character varying(10), "secondary_phone" character varying(10), "other_phone" character varying(10), "email" character varying(50) NOT NULL, "application_date" TIMESTAMP NOT NULL, "supervisor_first_name" character varying(100) NOT NULL, "supervisor_last_name" character varying(100) NOT NULL, "supervisor_email" character varying(50), "skills_abilities" character varying(512), "coordinatorNotes" text, "logisticsNotes" text, "status" "public"."personnel_status_enum" NOT NULL DEFAULT 'PENDING', "union_membership" "public"."union_membership" NOT NULL, "remote_only" boolean NOT NULL DEFAULT false, "willing_to_travel" boolean NOT NULL DEFAULT false, "first_aid_level" character varying(100), "first_aid_expiry" date, "driver_license(s)" character varying(100), "psychological_first_aid" boolean, "first_nation_exp_living" boolean, "first_nation_exp_working" boolean, "pecc_exp" boolean, "preoc_exp" boolean, "emergency_exp" boolean, "jobTitle" character varying(100), "work_location" character varying(100), "work_region" "public"."region", "home_location" character varying(100) NOT NULL, "home_region" "public"."region" NOT NULL, "intake_form_id" integer, CONSTRAINT "REL_17b3406f66e3fe7b2541386046" UNIQUE ("intake_form_id"), CONSTRAINT "PK_33a7253a5d2a326fec3cdc0baa5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "personnel_training" ("personnelId" uuid NOT NULL, "trainingId" integer NOT NULL, CONSTRAINT "PK_bf54cf0cb8d644cc1cf6fd51990" PRIMARY KEY ("personnelId", "trainingId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e37cd98e86f078262068b6bfa8" ON "personnel_training" ("personnelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ca2f58b8d3e6542a0ef1e702a" ON "personnel_training" ("trainingId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "availability" ADD CONSTRAINT "FK_6cc78405af89153aca238994351" FOREIGN KEY ("personnel") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" ADD CONSTRAINT "FK_68b71d04347540e680b4c26182f" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" ADD CONSTRAINT "FK_50a87e5f4e530849c6b7bcc6ca8" FOREIGN KEY ("function_id") REFERENCES "function"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_f6648c7a27642f55140b234f8d6" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_17b3406f66e3fe7b25413860465" FOREIGN KEY ("intake_form_id") REFERENCES "form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_training" ADD CONSTRAINT "FK_e37cd98e86f078262068b6bfa8f" FOREIGN KEY ("personnelId") REFERENCES "personnel"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_training" ADD CONSTRAINT "FK_3ca2f58b8d3e6542a0ef1e702a7" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel_training" DROP CONSTRAINT "FK_3ca2f58b8d3e6542a0ef1e702a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_training" DROP CONSTRAINT "FK_e37cd98e86f078262068b6bfa8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP CONSTRAINT "FK_17b3406f66e3fe7b25413860465"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP CONSTRAINT "FK_f6648c7a27642f55140b234f8d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" DROP CONSTRAINT "FK_50a87e5f4e530849c6b7bcc6ca8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" DROP CONSTRAINT "FK_68b71d04347540e680b4c26182f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability" DROP CONSTRAINT "FK_6cc78405af89153aca238994351"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ca2f58b8d3e6542a0ef1e702a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e37cd98e86f078262068b6bfa8"`,
    );
    await queryRunner.query(`DROP TABLE "personnel_training"`);
    await queryRunner.query(`DROP TABLE "personnel"`);
    await queryRunner.query(`DROP TYPE "public"."region"`);
    await queryRunner.query(`DROP TYPE "public"."union_membership"`);
    await queryRunner.query(`DROP TYPE "public"."personnel_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."ministry"`);
    await queryRunner.query(`DROP TABLE "form"`);
    await queryRunner.query(`DROP TABLE "training"`);
    await queryRunner.query(`DROP TABLE "personnel_function_experience"`);
    await queryRunner.query(`DROP TYPE "public"."experience"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TYPE "public"."region"`);
    await queryRunner.query(`DROP TABLE "availability"`);
    await queryRunner.query(`DROP TYPE "public"."availability-type"`);
    await queryRunner.query(`DROP TABLE "function"`);
  }
}
