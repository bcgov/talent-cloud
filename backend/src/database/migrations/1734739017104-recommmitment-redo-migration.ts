import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecommitmentRedoMigration1734739017104
  implements MigrationInterface
{
  name = 'RecommitmentRedoMigration1734739017104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from recommitment cascade`);
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "bcws"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_bcws_enum"`);
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "supervisor_reason_bcws"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "member_reason_bcws"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_program_enum" AS ENUM('bcws', 'emcr', 'all')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "program" "public"."recommitment_program_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_d1a77b46bc3e0fd6cdd8959faa2" PRIMARY KEY ("member", "year", "program")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec"`,
    );

    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "UQ_d1a77b46bc3e0fd6cdd8959faa2" UNIQUE ("member", "year", "program")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "UQ_d1a77b46bc3e0fd6cdd8959faa2"`,
    );

    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec" UNIQUE ("member", "year")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_d1a77b46bc3e0fd6cdd8959faa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec" PRIMARY KEY ("member", "year")`,
    );
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "program"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_program_enum"`);
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "member_reason_bcws" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "supervisor_reason_bcws" character varying(250)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_bcws_enum" AS ENUM('MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'PENDING', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "bcws" "public"."recommitment_bcws_enum"`,
    );
  }
}
