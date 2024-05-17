import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageIDMigration1715887048702 implements MigrationInterface {
    name = 'LanguageIDMigration1715887048702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "PK_84e834ee0e921d47e11b5c6bd29"`);
        
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ALTER COLUMN "personnel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`);
    
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("id")`);

        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb"`);
        
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ALTER COLUMN "personnel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "PK_84e834ee0e921d47e11b5c6bd29" PRIMARY KEY ("personnel_id")`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP COLUMN "id"`);
    }

}
