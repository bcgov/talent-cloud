import { MigrationInterface, QueryRunner } from "typeorm";

export class TravelPreferenceMigration1722233026955 implements MigrationInterface {
    name = 'TravelPreferenceMigration1722233026955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."travel_preference" AS ENUM('REMOTE_ONLY', 'WILLING_TO_TRAVEL_HOME_LOCATION', 'WILLING_TO_TRAVEL_FIRE_ZONE', 'WILLING_TO_TRAVEL_FIRE_CENTRE', 'WILLING_TO_TRAVEL_REGION', 'WILLING_TO_TRAVEL_ANYWHERE', 'WILLING_TO_TRAVEL_UNKNOWN')`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "travel_preference" "public"."travel_preference" NOT NULL DEFAULT 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD "travel_preference" "public"."travel_preference" NOT NULL DEFAULT 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`CREATE TYPE "public"."fire-zone" AS ENUM('C1', 'C2', 'C3', 'C4', 'C5', 'V1', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'VA', 'K2', 'K4', 'K5', 'K6', 'K7', 'R1', 'R2', 'R3', 'R4', 'R5', 'R8', 'R9', 'G1', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'N1', 'N2', 'N4', 'N5', 'N6', 'N7')`);
        await queryRunner.query(`ALTER TABLE "location" ADD "fire_zone" "public"."fire-zone"`);
        await queryRunner.query(`UPDATE "bcws_personnel" SET "travel_preference" = 'WILLING_TO_TRAVEL_UNKNOWN' WHERE (SELECT "willing_to_travel" FROM "personnel" WHERE "personnel"."id" = "bcws_personnel"."personnel_id") = true`);
        await queryRunner.query(`UPDATE "bcws_personnel" SET "travel_preference" = 'REMOTE_ONLY' WHERE (SELECT "remote_only" FROM "personnel" WHERE "personnel"."id" = "bcws_personnel"."personnel_id") = true`);
        await queryRunner.query(`UPDATE "emcr_personnel" SET "travel_preference" = 'WILLING_TO_TRAVEL_UNKNOWN' WHERE (SELECT "willing_to_travel" FROM "personnel" WHERE "personnel"."id" = "emcr_personnel"."personnel_id") = true`);
        await queryRunner.query(`UPDATE "emcr_personnel" SET "travel_preference" = 'REMOTE_ONLY' WHERE (SELECT "remote_only" FROM "personnel" WHERE "personnel"."id" = "emcr_personnel"."personnel_id") = true`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "willing_to_travel"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "remote_only"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "remote_only" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "willing_to_travel" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`UPDATE "personnel" SET "willing_to_travel" = true WHERE (SELECT "travel_preference" FROM "bcws_personnel" WHERE "bcws_personnel"."personnel_id" = "personnel"."id") = 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`UPDATE "personnel" SET "remote_only" = true WHERE (SELECT "travel_preference" FROM "bcws_personnel" WHERE "bcws_personnel"."personnel_id" = "personnel"."id") != 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`UPDATE "personnel" SET "willing_to_travel" = true WHERE (SELECT "travel_preference" FROM "emcr_personnel" WHERE "emcr_personnel"."personnel_id" = "personnel"."id") = 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`UPDATE "personnel" SET "remote_only" = true WHERE (SELECT "travel_preference" FROM "emcr_personnel" WHERE "emcr_personnel"."personnel_id" = "personnel"."id") != 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "fire_zone"`);
        await queryRunner.query(`DROP TYPE "public"."fire-zone"`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP COLUMN "travel_preference"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "travel_preference"`);
        await queryRunner.query(`DROP TYPE "public"."travel_preference"`);
    }

}
