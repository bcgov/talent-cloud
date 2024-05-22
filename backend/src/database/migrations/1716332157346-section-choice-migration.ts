import { MigrationInterface, QueryRunner } from "typeorm";

export class SectionChoiceMigration1716332157346 implements MigrationInterface {
    name = 'SectionChoiceMigration1716332157346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel_roles" DROP COLUMN "rank"`);
        await queryRunner.query(`CREATE TYPE "public"."section" AS ENUM('PLANNING', 'LOGISTICS', 'FINANCE_ADMIN', 'OPERATIONS', 'COMMAND', 'AVIATION')`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "first_choice_section" "public"."section"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "second_choice_section" "public"."section"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ALTER COLUMN "personnel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel" RENAME COLUMN "driver_license(s)" TO "driver_licenses"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" RENAME COLUMN "driver_licenses" TO "driver_license(s)"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ALTER COLUMN "personnel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "second_choice_section"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "first_choice_section"`);
        await queryRunner.query(`DROP TYPE "public"."section"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_roles" ADD "rank" integer`);
    }

}
