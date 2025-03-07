import { MigrationInterface, QueryRunner } from "typeorm";

export class ChipsMigration1741166137543 implements MigrationInterface {
    name = 'ChipsMigration1741166137543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_last_ping" date`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_last_action_date" date`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_profile_missing" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_last_updated_properties" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_issues" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_ignore_properties" text array`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "chips_training_data" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_training_data"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_ignore_properties"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_issues"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_last_updated_properties"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_profile_missing"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_last_action_date"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "chips_last_ping"`);
    }

}
