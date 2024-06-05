import { MigrationInterface, QueryRunner } from "typeorm"

export class EmcrDateMigration1717608398355 implements MigrationInterface {
    name = "EmcrDateMigration1717608398355"

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`update emcr_personnel ep set date_approved = (select date_approved from emcr_personnel ep2 where ep2.personnel_id = ep.personnel_id) - interval '7 hour' where date_approved is not null;`)


        await queryRunner.query(`update emcr_personnel ep set date_applied = (select date_applied from emcr_personnel ep2 where ep2.personnel_id = ep.personnel_id) - interval '7 hour' where date_applied is not null;`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`update emcr_personnel ep set date_approved = (select date_approved from emcr_personnel ep2 where ep2.personnel_id = ep.personnel_id) + interval '7 hour' where date_approved is not null;`)

        await queryRunner.query(`update emcr_personnel ep set date_applied = (select date_applied from emcr_personnel ep2 where ep2.personnel_id = ep.personnel_id) + interval '7 hour' where date_applied is not null;`)
    }

}
