import { MigrationInterface, QueryRunner } from "typeorm";

export class SupervisorPhoneMigration1717446743416 implements MigrationInterface {
    name = 'SupervisorPhoneMigration1717446743416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "supervisor_phone" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "supervisor_phone"`);
    }

}
