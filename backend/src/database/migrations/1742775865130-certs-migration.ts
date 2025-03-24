import { MigrationInterface, QueryRunner } from 'typeorm';

export class CertsMigration1742775865130 implements MigrationInterface {
  name = 'CertsMigration1742775865130';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT into personnel_certifications(personnel_id, certification_id) SELECT ep.personnel_id, 2 from emcr_personnel ep where ep.psychological_first_aid=true and ep.personnel_id not in (select personnel_id from personnel_certifications where certification_id = 2 )`,
    );

    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" RENAME COLUMN "first_nation_exp_working" TO "first_nation_exp"`,
    );

    await queryRunner.query(
      `insert into personnel_certifications (personnel_id, expiry_date, certification_id) select p.personnel_id, p.first_aid_expiry, p.certification_id  from (select personnel_id,  first_aid_expiry, c.id as certification_id from emcr_personnel ep join certification c  on c.id = 8 where first_aid_level = 'Level 1: Occupational First Aid' and ep.personnel_id not in (Select personnel_id from personnel_certifications where certification_id=8)) p`,
    );
    await queryRunner.query(
      `insert into personnel_certifications (personnel_id, expiry_date, certification_id) select p.personnel_id, p.first_aid_expiry, p.certification_id  from (select personnel_id,  first_aid_expiry, c.id as certification_id from emcr_personnel ep join certification c  on c.id = 9 where first_aid_level = 'Level 2: Occupational First Aid' and ep.personnel_id not in (Select personnel_id from personnel_certifications where certification_id=9)) p`,
    );
    await queryRunner.query(
      `insert into personnel_certifications (personnel_id, expiry_date, certification_id) select p.personnel_id, p.first_aid_expiry, p.certification_id  from (select personnel_id,  first_aid_expiry, c.id as certification_id from emcr_personnel ep join certification c  on c.id = 10 where first_aid_level = 'Level 2: Occupational First Aid' and ep.personnel_id not in (Select personnel_id from personnel_certifications where certification_id=10)) p`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "first_nation_exp_living"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "psychological_first_aid"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "first_aid_expiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "first_aid_level"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD COLUMN "first_aid_level" VARCHAR;`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD COLUMN "first_aid_expiry" DATE;`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD COLUMN "psychological_first_aid" BOOLEAN;`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD COLUMN "first_nation_exp_living" BOOLEAN;`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" RENAME COLUMN "first_nation_exp" TO "first_nation_exp_working";`,
    );

    await queryRunner.query(
      `delete from  personnel_certifications where certification_id = 8 and personnel_id in  (select personnel_id from personnel_certifications where certification_id = 8 ) `,
    );
    await queryRunner.query(
      `delete from  personnel_certifications where certification_id = 9 and personnel_id in  (select personnel_id from personnel_certifications where certification_id = 9 ) `,
    );
    await queryRunner.query(
      `delete from  personnel_certifications where certification_id = 10 and personnel_id in  (select personnel_id from personnel_certifications where certification_id = 10) `,
    );
    await queryRunner.query(
      `DELETE FROM personnel_certifications WHERE certification_id = 2 AND personnel_id IN (SELECT personnel_id FROM emcr_personnel WHERE psychological_first_aid = true);`,
    );
  }
}
