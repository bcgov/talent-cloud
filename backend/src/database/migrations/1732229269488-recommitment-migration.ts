import { MigrationInterface, QueryRunner } from "typeorm";

export class RecommitmentMigration1732229269488 implements MigrationInterface {
    name = 'RecommitmentMigration1732229269488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recommitment_cycle" ("year" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, CONSTRAINT "UQ_9bdc497efce5720701ba9245275" UNIQUE ("year"), CONSTRAINT "PK_9bdc497efce5720701ba9245275" PRIMARY KEY ("year"))`);
        await queryRunner.query(`CREATE TYPE "public"."recommitment_emcr_enum" AS ENUM('PENDING', 'MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`);
        await queryRunner.query(`CREATE TYPE "public"."recommitment_bcws_enum" AS ENUM('PENDING', 'MEMBER_COMMITTED', 'MEMBER_DENIED', 'MEMBER_NO_RESPONSE', 'SUPERVISOR_APPROVED', 'SUPERVISOR_DENIED', 'SUPERVISOR_NO_RESPONSE')`);
        await queryRunner.query(`CREATE TABLE "recommitment" ("member" uuid NOT NULL, "emcr" "public"."recommitment_emcr_enum", "bcws" "public"."recommitment_bcws_enum", "member_decision_date" TIMESTAMP, "member_reason_emcr" character varying(250), "member_reason_bcws" character varying(250), "supervisor_idir" character varying(50), "supervisor_decision_date" TIMESTAMP, "supervisor_reason_emcr" character varying(250), "supervisor_reason_bcws" character varying(250), "year" integer, CONSTRAINT "PK_fea6502c12c7d50eec34d3a9ab2" PRIMARY KEY ("member"))`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "recommitment" uuid`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD CONSTRAINT "UQ_b47488b0d56486a24efecb358cc" UNIQUE ("recommitment")`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8" FOREIGN KEY ("year") REFERENCES "recommitment_cycle"("year") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD CONSTRAINT "FK_b47488b0d56486a24efecb358cc" FOREIGN KEY ("recommitment") REFERENCES "recommitment"("member") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" DROP CONSTRAINT "FK_b47488b0d56486a24efecb358cc"`);
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP CONSTRAINT "UQ_b47488b0d56486a24efecb358cc"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "recommitment"`);
        await queryRunner.query(`DROP TABLE "recommitment"`);
        await queryRunner.query(`DROP TYPE "public"."recommitment_bcws_enum"`);
        await queryRunner.query(`DROP TYPE "public"."recommitment_emcr_enum"`);
        await queryRunner.query(`DROP TABLE "recommitment_cycle"`);
    }

}
