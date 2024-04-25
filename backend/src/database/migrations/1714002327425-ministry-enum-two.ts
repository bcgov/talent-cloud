import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1714002327425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE personnel SET ministry='MMHA' WHERE ministry='MHA'`)
        await queryRunner.query(`ALTER TYPE "public"."ministry" RENAME TO "ministry_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ministry" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry" USING "ministry"::"text"::"public"."ministry"`);
        await queryRunner.query(`DROP TYPE "public"."ministry_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ministry_old" AS ENUM('AGRI', 'AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MHA', 'MUNI', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry_old" USING "ministry"::"text"::"public"."ministry_old"`);
        await queryRunner.query(`DROP TYPE "public"."ministry"`);
        await queryRunner.query(`ALTER TYPE "public"."ministry_old" RENAME TO "ministry"`);
        await queryRunner.query(`UPDATE personnel SET ministry='MHA' WHERE ministry='MMHA'`)

    }

}
