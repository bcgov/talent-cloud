import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711575873472 implements MigrationInterface {
    name = 'Migration1711575873472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "date_joined" type TIMESTAMP `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ALTER TYPE "date_joined" type DATE `);
    }
}
