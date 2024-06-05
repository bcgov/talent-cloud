import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1717606123810 implements MigrationInterface {
name="InsertLocationMigration1717606123810"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public."location" (id, location_name,region,fire_centre) VALUES(89, 'Telkwa', 'NWE', 'NORTHWEST'),(90,'Anahim Lake', 'NWE', 'CARIBOO');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public."location" WHERE location_name='Telkwa' OR location_name='Anahim Lake';`);
    }

}
