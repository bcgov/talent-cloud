import { MigrationInterface, QueryRunner } from "typeorm"

export class AGRIMinistryMigration1717694601718 implements MigrationInterface {
    name='AGRIMinistryMigration1717694601718'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update personnel set ministry = 'AF' where ministry = 'AGRI'`)

        await queryRunner.query(`ALTER TYPE "public"."ministry" RENAME TO "ministry_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ministry" AS ENUM('AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'GCPE',
         'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MHA', 'MUNI', 'PREM', 'PSA', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry" USING "ministry"::"text"::"public"."ministry"`);
        await queryRunner.query(`DROP TYPE "public"."ministry_old"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ministry_old" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry_old" USING "ministry"::"text"::"public"."ministry_old"`);
        await queryRunner.query(`DROP TYPE "public"."ministry"`);
        await queryRunner.query(`ALTER TYPE "public"."ministry_old" RENAME TO "ministry"`);
        await queryRunner.query(`update personnel set ministry = 'AGRI' where ministry = 'AF'`)
    }

}
