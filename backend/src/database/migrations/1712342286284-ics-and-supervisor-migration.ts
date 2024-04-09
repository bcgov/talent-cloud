import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712342286284 implements MigrationInterface {
    name = 'ApprovedSupervisorMigration1712342286284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "approved_by_supervisor" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "approved_by_supervisor"`);
    }

}
