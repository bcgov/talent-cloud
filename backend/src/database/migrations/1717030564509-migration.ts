import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1717030564509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update personnel set home_location = 67 where home_location = 47`)
        await queryRunner.query(`update personnel set work_location = 67 where work_location = 47`)
        await queryRunner.query(`update personnel set home_location = 69 where home_location = 52`)
        await queryRunner.query(`update personnel set work_location = 69 where work_location = 52`)

        await queryRunner.query(`DELETE from location where id in(52,47)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO location(id, location_name,  region, fire_centre) VALUES
        (52,	'Castelgar',	'SEA',	'SOUTHEAST'),
        (47,	'MacKenzie',	'NEA',	'PRINCE_GEORGE')
        `)

        await queryRunner.query(`update personnel set home_location = 47 where home_location = 67`)
        await queryRunner.query(`update personnel set work_location = 47 where work_location = 67`)
        await queryRunner.query(`update personnel set home_location = 52 where home_location = 69`)
        await queryRunner.query(`update personnel set work_location = 52 where work_location = 69`)
    }

}
