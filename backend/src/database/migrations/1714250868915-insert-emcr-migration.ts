import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714250868915 implements MigrationInterface {
  name = 'InsertEmcrMigration1714250868915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into emcr_location (id, location_name, "region") select id, location_name, region from "location" `,
    );
    await queryRunner.query(
      `insert into emcr_function (id, name, abbreviation) select id, name, abbreviation from "function"`,
    );

    await queryRunner.query(
      `insert into emcr_training(id,	name) select id, name from training`,
    );

    await queryRunner.query(
      `insert into public.emcr_personnel_training("personnel_id", "training_id") select "personnelId", "trainingId" from personnel_training`,
    );

    await queryRunner.query(
      `insert into emcr_function_experience(function_id, experience_type, personnel_id) select function_id, experience_type, personnel_id from personnel_function_experience`,
    );

    await queryRunner.query(`
                                    insert
                                    	into
                                    	emcr_personnel (
                                    	personnel_id,
                                    	date_joined,
                                    	application_date,
                                    	approved_by_supervisor,
                                    	coordinator_notes,
                                    	logistics_notes,
                                    	status,
                                    	work_location,
                                    	work_region,
                                    	home_location,
                                    	home_region,
                                    	first_aid_level,
                                    	first_aid_expiry,
                                    	psychological_first_aid,
                                    	first_nation_exp_living,
                                    	first_nation_exp_working,
                                    	emergency_exp,
                                    	pecc_exp,
                                    	preoc_exp)
                                    select
                                    	id,
                                    	date_joined,
                                    	application_date,
                                    	approved_by_supervisor,
                                    	"coordinatorNotes",
                                    	"logisticsNotes",
                                    	status::text::emcr_status_enum,
                                    	work_location,
                                    	work_region,
                                    	home_location,
                                    	home_region,
                                    	first_aid_level,
                                    	first_aid_expiry,
                                    	psychological_first_aid,
                                    	first_nation_exp_living,
                                    	first_nation_exp_working,
                                    	emergency_exp,
                                    	pecc_exp,
                                    	preoc_exp
                                    from
                                    	personnel;

                                `);

    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" ADD CONSTRAINT "FK_b84bbf920f4382e8c742fe0535f" FOREIGN KEY ("function_id") REFERENCES "emcr_function"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_a227524a837750ecde94bbf5e44" FOREIGN KEY ("work_location", "work_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_1dbe3a97a135c675fcfe257cf23" FOREIGN KEY ("home_location", "home_region") REFERENCES "emcr_location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34" FOREIGN KEY ("personnel_id") REFERENCES "emcr_personnel"("personnel_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" ADD CONSTRAINT "FK_76f15321aa16f18c7373d701861" FOREIGN KEY ("training_id") REFERENCES "emcr_training"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_76f15321aa16f18c7373d701861"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel_training" DROP CONSTRAINT "FK_6c055f319e4cdf1d52f2cd9be34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_1dbe3a97a135c675fcfe257cf23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_a227524a837750ecde94bbf5e44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_cf230176de57b6bf483f7283cad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_b84bbf920f4382e8c742fe0535f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_function_experience" DROP CONSTRAINT "FK_523e2bf5abd84e44b7a2fecd0c7"`,
    );
    await queryRunner.query(
      `delete from emcr_function_experience where personnel_id in (select personnel_id from emcr_function_experience)`,
    );
    await queryRunner.query(
      `delete from public.emcr_personnel_training where "personnel_id" in (select personnel_id from personnel_training)`,
    );

    await queryRunner.query(
      `delete from emcr_location where id in (select id from "location" )`,
    );

    await queryRunner.query(
      `delete from emcr_function where id in (select id from "function" )`,
    );

    await queryRunner.query(
      `delete from emcr_personnel where personnel_id in (select id from personnel)`,
    );
  }
}
