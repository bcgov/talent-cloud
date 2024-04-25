import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714002300892 implements MigrationInterface {
    name = 'MinistryEnum1714002300892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ministry" RENAME TO "ministry_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ministry" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry" USING "ministry"::"text"::"public"."ministry"`);
        await queryRunner.query(`DROP TYPE "public"."ministry_old"`);
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "date" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "availability" ALTER COLUMN "date" SET DEFAULT '2024-03-13'`);
        await queryRunner.query(`CREATE TYPE "public"."ministry_old" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry_old" USING "ministry"::"text"::"public"."ministry_old"`);
        await queryRunner.query(`DROP TYPE "public"."ministry"`);
        await queryRunner.query(`ALTER TYPE "public"."ministry_old" RENAME TO "ministry"`);
        
    }

}
