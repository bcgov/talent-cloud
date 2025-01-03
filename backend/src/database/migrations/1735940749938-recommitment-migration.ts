import { MigrationInterface, QueryRunner } from 'typeorm';

export class RecommitmentMigration1735940749938 implements MigrationInterface {
  name = 'RecommitmentMigration1735940749938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "FK_fea6502c12c7d50eec34d3a9ab2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_1ff108632f076e6d4cdc2e338b8" PRIMARY KEY ("year")`,
    );
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "member"`);
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "emcr"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_emcr_enum"`);
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "bcws"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_bcws_enum"`);
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "supervisor_reason_emcr"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "supervisor_reason_bcws"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "member_reason_emcr"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "member_reason_bcws"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "personnel" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_1ff108632f076e6d4cdc2e338b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_d0dcbef71192bb72c3e9c2322ca" PRIMARY KEY ("year", "personnel")`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_program_enum" AS ENUM('bcws', 'emcr', 'all')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "program" "public"."recommitment_program_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_d0dcbef71192bb72c3e9c2322ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_10143c069cf0e7a77154054d67c" PRIMARY KEY ("year", "personnel", "program")`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_status_enum" AS ENUM('PENDING', 'MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "status" "public"."recommitment_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "member_reason" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "supervisor_reason" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "UQ_10143c069cf0e7a77154054d67c" UNIQUE ("personnel", "year", "program")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "FK_a01576f1971477661fb73d2d6c8" FOREIGN KEY ("personnel") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "FK_a01576f1971477661fb73d2d6c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "UQ_10143c069cf0e7a77154054d67c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "supervisor_reason"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "member_reason"`,
    );
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_10143c069cf0e7a77154054d67c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_d0dcbef71192bb72c3e9c2322ca" PRIMARY KEY ("year", "personnel")`,
    );
    await queryRunner.query(`ALTER TABLE "recommitment" DROP COLUMN "program"`);
    await queryRunner.query(`DROP TYPE "public"."recommitment_program_enum"`);
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_d0dcbef71192bb72c3e9c2322ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_1ff108632f076e6d4cdc2e338b8" PRIMARY KEY ("year")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP COLUMN "personnel"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "member_reason_bcws" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "member_reason_emcr" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "supervisor_reason_bcws" character varying(250)`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "supervisor_reason_emcr" character varying(250)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_bcws_enum" AS ENUM('MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'PENDING', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "bcws" "public"."recommitment_bcws_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."recommitment_emcr_enum" AS ENUM('MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'PENDING', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "emcr" "public"."recommitment_emcr_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD "member" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" DROP CONSTRAINT "PK_1ff108632f076e6d4cdc2e338b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec" PRIMARY KEY ("member", "year")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec" UNIQUE ("member", "year")`,
    );
    await queryRunner.query(
      `ALTER TABLE "recommitment" ADD CONSTRAINT "FK_fea6502c12c7d50eec34d3a9ab2" FOREIGN KEY ("member") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
