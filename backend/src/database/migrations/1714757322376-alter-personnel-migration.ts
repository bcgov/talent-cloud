import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714757322376 implements MigrationInterface {
  name = 'AlterPersonnelMigration1714757322376';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "date_joined"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "application_date"`,
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
    await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "status"`);

    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "first_aid_level"`,
    );
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
      `ALTER TABLE "personnel" DROP COLUMN "work_location"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "home_location"`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "approved_by_supervisor" boolean NOT NULL DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "home_region" "public"."region" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "home_location" character varying(100) NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "work_region" "public"."region"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "work_location" character varying(100)`,
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
      `ALTER TABLE "personnel" ADD "first_aid_level" character varying(100)`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "status" "public"."personnel_status_enum" NOT NULL DEFAULT 'PENDING'`,
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
      `ALTER TABLE "personnel" ADD "application_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "date_joined" TIMESTAMP`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD CONSTRAINT "FK_f6648c7a27642f55140b234f8d6" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
