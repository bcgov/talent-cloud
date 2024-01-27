import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1706297652551 implements MigrationInterface {
  name = 'Migrations1706297652551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "function" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "abbreviation" character varying(10) NOT NULL, CONSTRAINT "PK_6e085d059b4227aab09e8a5b05e" PRIMARY KEY ("id"))`,
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
      `CREATE TYPE "public"."region" AS ENUM('HQ', 'CTL', 'NEA', 'NWE', 'SEA', 'SWE', 'VIC')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ministry" AS ENUM('AGRI', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TAC', 'MOTI', 'WLRS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."classification" AS ENUM('BCGEU', 'EXCLUDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "personnel" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "work_location" character varying(100) NOT NULL, "region" "public"."region" NOT NULL, "ministry" "public"."ministry" NOT NULL, "primary_phone" character varying(25), "secondary_phone" character varying(25), "other_phone" character varying(25), "email" character varying(50) NOT NULL, "application_date" TIMESTAMP NOT NULL, "supervisor" character varying(100) NOT NULL, "skills_abilities" character varying(512), "notes" character varying(512), "active" boolean NOT NULL DEFAULT true, "classification" "public"."classification" NOT NULL, "remote_only" boolean NOT NULL DEFAULT false, "willing_to_travel" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_33a7253a5d2a326fec3cdc0baa5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."availability-type" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "availability" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "availability_type" "public"."availability-type" NOT NULL, "personnel_id" uuid, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "personnel_function_experience" ADD CONSTRAINT "FK_68b71d04347540e680b4c26182f" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" ADD CONSTRAINT "FK_50a87e5f4e530849c6b7bcc6ca8" FOREIGN KEY ("function_id") REFERENCES "function"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "availability" ADD CONSTRAINT "FK_6a0cc731020a52e68c3007d2e72" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "availability" DROP CONSTRAINT "FK_6a0cc731020a52e68c3007d2e72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" DROP CONSTRAINT "FK_50a87e5f4e530849c6b7bcc6ca8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_function_experience" DROP CONSTRAINT "FK_68b71d04347540e680b4c26182f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ca2f58b8d3e6542a0ef1e702a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e37cd98e86f078262068b6bfa8"`,
    );
    await queryRunner.query(`DROP TABLE "personnel_training"`);
    await queryRunner.query(`DROP TABLE "availability"`);
    await queryRunner.query(`DROP TYPE "public"."availability-type"`);
    await queryRunner.query(`DROP TABLE "personnel"`);
    await queryRunner.query(`DROP TYPE "public"."classification"`);
    await queryRunner.query(`DROP TYPE "public"."ministry"`);
    await queryRunner.query(`DROP TYPE "public"."region"`);
    await queryRunner.query(`DROP TABLE "training"`);
    await queryRunner.query(`DROP TABLE "personnel_function_experience"`);
    await queryRunner.query(`DROP TYPE "public"."experience"`);
    await queryRunner.query(`DROP TABLE "function"`);
  }
}
