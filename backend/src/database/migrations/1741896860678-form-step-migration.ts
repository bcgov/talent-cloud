import { MigrationInterface, QueryRunner } from "typeorm";

export class StepMigration1741896860678 implements MigrationInterface {
    name = 'StepMigration1741896860678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intake_form" ADD "step" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.query(`ALTER TABLE "intake_form" DROP COLUMN "step"`);
    }

}
