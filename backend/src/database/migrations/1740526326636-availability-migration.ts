import { MigrationInterface, QueryRunner } from "typeorm";

export class AvailabilityMigration implements MigrationInterface {
    name = 'AvailabilityMigration1740526326636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "availability_confirmed_until" date`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "availability_confirmed_on" date`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "availability_confirmed_on"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "availability_confirmed_until"`);
    }

}
