import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageIDMigration1715887048702 implements MigrationInterface {
    name = 'LanguageIDMigration1715887048702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "PK_84e834ee0e921d47e11b5c6bd29"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "PK_c45238c0fe98184ab88c981677d" PRIMARY KEY ("personnel_id", "id")`);
        
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "PK_c45238c0fe98184ab88c981677d"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "PK_84e834ee0e921d47e11b5c6bd29" PRIMARY KEY ("personnel_id")`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP COLUMN "id"`);
    }

}
