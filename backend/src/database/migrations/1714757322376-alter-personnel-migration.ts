import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714757322376 implements MigrationInterface {
  name = 'AlterPersonnelMigration1714757322376';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP CONSTRAINT "FK_f6648c7a27642f55140b234f8d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_76f15321aa16f18c7373d701861"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "date_joined"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "application_date"`,
    );
    await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "status"`);

    await queryRunner.query(`DROP TYPE "public"."personnel_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "first_aid_expiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "psychological_first_aid"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "first_nation_exp_living"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "first_nation_exp_working"`,
    );
    await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "pecc_exp"`);
    await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "preoc_exp"`);
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "emergency_exp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "work_region"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "home_region"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "approved_by_supervisor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "skills_abilities"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "coordinatorNotes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "logisticsNotes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "first_aid_level"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "work_location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "home_location"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."fire-centre" AS ENUM('CARIBOO', 'COASTAL', 'KAMLOOPS', 'NORTHWEST', 'PRINCE_GEORGE', 'SOUTHEAST')`,
    );

    await queryRunner.query(
      `ALTER TABLE "location" ADD "fire_centre" "public"."fire-centre"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "fire_centre"`);
    await queryRunner.query(`DROP TYPE "public"."fire-centre"`);
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "home_location" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "work_location" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "first_aid_level" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "logisticsNotes" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "coordinatorNotes" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "skills_abilities" character varying(512)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "approved_by_supervisor" boolean DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "home_region" "public"."region"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "work_region" "public"."region"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "emergency_exp" boolean`,
    );
    await queryRunner.query(`ALTER TABLE "personnel" ADD "preoc_exp" boolean`);
    await queryRunner.query(`ALTER TABLE "personnel" ADD "pecc_exp" boolean`);
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "first_nation_exp_working" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "first_nation_exp_living" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "psychological_first_aid" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "first_aid_expiry" date`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."personnel_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "status" "public"."personnel_status_enum" DEFAULT 'PENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "application_date" TIMESTAMP `,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "date_joined" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_76f15321aa16f18c7373d701861" FOREIGN KEY ("training_id") REFERENCES "emcr_training"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_f6648c7a27642f55140b234f8d6" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
