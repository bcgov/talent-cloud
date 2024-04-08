import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712342286284 implements MigrationInterface {
    name = 'ICSandSupervisorMigration1712342286284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "ics_training" boolean`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "supervisor_approval" boolean`);
        
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "supervisor_approval"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "ics_training"`);
    }

}
