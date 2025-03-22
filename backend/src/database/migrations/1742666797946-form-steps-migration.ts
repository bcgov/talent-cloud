import { MigrationInterface, QueryRunner } from 'typeorm';

export class FormStepsMigration1742666797946 implements MigrationInterface {
  name = 'FormStepsMigration1742666797946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "intake_form" DROP COLUMN "step"`);

    await queryRunner.query(
      `ALTER TYPE "public"."ministry" RENAME TO "ministry_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ministry" AS ENUM('AF', 'AG', 'MCF', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'GCPE', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MMHA', 'MUNI', 'PREM', 'PSA', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'MOTI', 'WLRS', 'OTHER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry" USING "ministry"::"text"::"public"."ministry"`,
    );
    await queryRunner.query(`DROP TYPE "public"."ministry_old"`);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {


    await queryRunner.query(
      `CREATE TYPE "public"."ministry_old" AS ENUM('AF', 'AG', 'CITZ', 'ECC', 'EMCR', 'EMLI', 'ENV', 'FIN', 'FOR', 'GCPE', 'HLTH', 'HOUS', 'IRR', 'JEDI', 'LBR', 'MCF', 'MHA', 'MMHA', 'MOTI', 'MUNI', 'PREM', 'PSA', 'PSFS', 'PSSG', 'SDPR', 'TACS', 'WLRS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ALTER COLUMN "ministry" TYPE "public"."ministry_old" USING "ministry"::"text"::"public"."ministry_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."ministry"`);
    await queryRunner.query(
      `ALTER TYPE "public"."ministry_old" RENAME TO "ministry"`,
    );
    await queryRunner.query(`ALTER TABLE "intake_form" ADD "step" integer`);
  }
}
