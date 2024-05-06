import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714756726366 implements MigrationInterface {
  name = 'EmcrMigration1714756726366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "emcr_function" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "abbreviation" character varying(10) NOT NULL, CONSTRAINT "PK_f87831f2434a6c39ba4752e6aeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "emcr_training" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_19dcd8d39708c2ed86890880a5d" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_location" ("id" integer NOT NULL, "location_name" character varying(100), "region" "public"."region", CONSTRAINT "UQ_70040fc8656d3eefe4fe7d206ed" UNIQUE ("location_name"), CONSTRAINT "UQ_emcr_location" UNIQUE ("location_name", "region"), CONSTRAINT "PK_f24391089b4afe27890718b0660" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "emcr_personnel" ("personnel_id" uuid NOT NULL, "date_approved" TIMESTAMP, "date_applied" TIMESTAMP, "approved_by_supervisor" boolean NOT NULL DEFAULT false, "coordinator_notes" text, "logistics_notes" text, "status" "public"."status" NOT NULL DEFAULT 'PENDING', "first_aid_level" character varying(100), "first_aid_expiry" date, "psychological_first_aid" boolean, "first_nation_exp_living" boolean, "first_nation_exp_working" boolean, "emergency_exp" boolean, "pecc_exp" boolean, "preoc_exp" boolean, "work_location" character varying(100), "work_region" "public"."region", "home_location" character varying(100) NOT NULL, "home_region" "public"."region" NOT NULL, CONSTRAINT "PK_58919845927d4ad0d1884666308" PRIMARY KEY ("personnel_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "emcr_function_experience" ("personnel_id" uuid NOT NULL, "function_id" integer NOT NULL, "experience_type" "public"."experience" NOT NULL, CONSTRAINT "PK_2f24928612bdea4f5ec3d74184a" PRIMARY KEY ("personnel_id", "function_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "emcr_personnel_training" ("personnel_id" uuid NOT NULL, "training_id" integer NOT NULL, CONSTRAINT "PK_b5ad9768d013fe9baa75a5ae708" PRIMARY KEY ("personnel_id", "training_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93119a27e00eb3d83b540d840d" ON "emcr_personnel_training" ("personnel_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d80a4e237f83b1791b9bcd08a" ON "emcr_personnel_training" ("training_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_58919845927d4ad0d1884666308" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_73e464e5323b10ca2eb1abd9322" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_b84bbf920f4382e8c742fe0535f" FOREIGN KEY ("function_id") REFERENCES "emcr_function"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_93119a27e00eb3d83b540d840d3" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_0d80a4e237f83b1791b9bcd08a7" FOREIGN KEY ("training_id") REFERENCES "emcr_training"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f" FOREIGN KEY ("work_location", "work_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f" CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_0d80a4e237f83b1791b9bcd08a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_93119a27e00eb3d83b540d840d3"`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_73e464e5323b10ca2eb1abd9322"`,
    );
    await queryRunner.query(`DROP TABLE "emcr_location"`);

    // await queryRunner.query(
    //     `ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_b84bbf920f4382e8c742fe0535f"`,
    //   );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_58919845927d4ad0d1884666308"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d80a4e237f83b1791b9bcd08a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93119a27e00eb3d83b540d840d"`,
    );
    await queryRunner.query(`DROP TABLE "emcr_personnel_training"`);
    await queryRunner.query(`DROP TABLE "emcr_function_experience"`);
    await queryRunner.query(`DROP TABLE "emcr_personnel"`);
    await queryRunner.query(`DROP TABLE "emcr_training"`);
    await queryRunner.query(`DROP TABLE "emcr_function"`);
  }
}
