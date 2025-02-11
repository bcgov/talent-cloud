import { MigrationInterface, QueryRunner } from "typeorm";

export class RecommitmentReinitiationMigration1739261137836 implements MigrationInterface {
    name = 'RecommitmentReinitiationMigration1739261137836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommitment_cycle" ADD "reinitiation_end_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommitment_cycle" DROP COLUMN "reinitiation_end_date"`);
    }

}
