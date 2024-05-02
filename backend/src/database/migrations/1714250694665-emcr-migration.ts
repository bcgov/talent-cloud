import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714250694665 implements MigrationInterface {
  name = 'EmcrMigration1714250694665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "emcr_function" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "abbreviation" character varying(10) NOT NULL, CONSTRAINT "PK_f87831f2434a6c39ba4752e6aeb" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_function_experience" ("personnel_id" uuid NOT NULL, "function_id" integer NOT NULL, "experience_type" "public"."experience" NOT NULL, CONSTRAINT "PK_a8d50a7be4cf98614ec472b085b" PRIMARY KEY ("personnel_id", "function_id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_location" ("id" integer NOT NULL, "location_name" character varying(100), "region" "public"."region" NOT NULL, CONSTRAINT "UQ_70040fc8656d3eefe4fe7d206ed" UNIQUE ("location_name"), CONSTRAINT "UQ_emcr_location" UNIQUE ("location_name", "region"), CONSTRAINT "PK_f24391089b4afe27890718b0660" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_training" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_19dcd8d39708c2ed86890880a5d" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."emcr_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_personnel" ("personnel_id" uuid NOT NULL, "date_joined" TIMESTAMP, "application_date" TIMESTAMP NOT NULL, "approved_by_supervisor" boolean NOT NULL DEFAULT false, "coordinator_notes" text, "logistics_notes" text, "status" "public"."emcr_status_enum" NOT NULL DEFAULT 'PENDING', "first_aid_level" character varying(100), "first_aid_expiry" date, "psychological_first_aid" boolean, "first_nation_exp_living" boolean, "first_nation_exp_working" boolean, "emergency_exp" boolean, "pecc_exp" boolean, "preoc_exp" boolean, "work_location" character varying(100), "work_region" "public"."region", "home_location" character varying(100) NOT NULL, "home_region" "public"."region" NOT NULL, CONSTRAINT "PK_cf230176de57b6bf483f7283cad" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_cf230176de57b6bf483f7283cad" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_personnel_training" ("personnel_id" uuid NOT NULL, "training_id" integer NOT NULL, CONSTRAINT "PK_c0d4b1385edcdc26d8b24cc10b4" PRIMARY KEY ("personnel_id", "training_id"))`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_6c055f319e4cdf1d52f2cd9be3" ON "emcr_personnel_training" ("personnel_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_76f15321aa16f18c7373d70186" ON "emcr_personnel_training" ("training_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_76f15321aa16f18c7373d70186"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c055f319e4cdf1d52f2cd9be3"`,
    );
    await queryRunner.query(`DROP TABLE "emcr_personnel_training"`);
    await queryRunner.query(`DROP TABLE "emcr_personnel"`);
    await queryRunner.query(`DROP TYPE "public"."emcr_status_enum"`);
    await queryRunner.query(`DROP TABLE "emcr_training"`);
    await queryRunner.query(`DROP TABLE "emcr_location"`);
    await queryRunner.query(`DROP TABLE "emcr_function_experience"`);
    await queryRunner.query(`DROP TABLE "emcr_function"`);
  }
}
