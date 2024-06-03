import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDivisionMigration1717438866103 implements MigrationInterface {
    name = 'RemoveDivisionMigration1717438866103'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "personnel" ADD "ministry" "public"."ministry"`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "division" character varying(100)`);


        await queryRunner.query(`Update personnel set ministry = (select
        ministry
      from
        division
        join  bcws_personnel on division.id = bcws_personnel.division_id
          
      where bcws_personnel.personnel_id = personnel.id)      
      where ministry is null
  `);

        await queryRunner.query(`Update personnel set division = (select
    division_name
  from
      bcws_personnel
      join division on division.id = bcws_personnel.division_id
  where bcws_personnel.personnel_id = personnel.id)      
`);

        await queryRunner.query(`Update personnel set ministry = (select
    ministry
  from
      emcr_personnel
  where emcr_personnel.personnel_id = personnel.id)      
  where ministry is null
`);
        await queryRunner.query(`alter table emcr_personnel drop column ministry;`)
        await queryRunner.query(`alter table bcws_personnel drop column division_id;`)
        await queryRunner.query(`ALTER TABLE "personnel" ADD "supervisor_phone" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "supervisor_phone"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "division_id" int`);

        await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD "ministry" "public"."ministry" NOT NULL`);

        await queryRunner.query(`Update emcr_personnel set ministry = (select
            ministry
          from
              personnel
          where personnel.id = emcr_personnel.personnel_id)      
        `);
        await queryRunner.query(`Update bcws_personnel set division_id = (select
    division.id
  from
      division
      join personnel on division.division_name = personnel.division
      and personnel.ministry = division.ministry    
  where personnel.id = bcws_personnel.personnel_id limit 1)      
`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "division"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "ministry"`);

    }

}
