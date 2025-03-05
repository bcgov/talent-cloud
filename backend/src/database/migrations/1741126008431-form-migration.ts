import { MigrationInterface, QueryRunner } from "typeorm";

export class FormMigration1741126008431 implements MigrationInterface {
    name = 'FormMigration1741126008431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."intake_form_status_enum" AS ENUM('draft', 'submitted')`);
        await queryRunner.query(`CREATE TYPE "public"."intake_form_program_enum" AS ENUM('bcws', 'emcr', 'all')`);
        await queryRunner.query(`CREATE TABLE "intake_form" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personnel" jsonb DEFAULT '{}', "created_by_email" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "status" "public"."intake_form_status_enum", "program" "public"."intake_form_program_enum", CONSTRAINT "PK_3d7bdea7ae9aaf00b55d34eae03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`DROP TABLE "intake_form"`);
        await queryRunner.query(`DROP TYPE "public"."intake_form_program_enum"`);
        await queryRunner.query(`DROP TYPE "public"."intake_form_status_enum"`);
    }

}
