import { MigrationInterface, QueryRunner } from "typeorm";

export class TravelPreferenceMigration1722038102584 implements MigrationInterface {
    name = 'TravelPreferenceMigration1722038102584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."fire-zone" AS ENUM('C1', 'C2', 'C3', 'C4', 'C5', 'V1', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'VA', 'K2', 'K4', 'K5', 'K6', 'K7', 'R1', 'R2', 'R3', 'R4', 'R5', 'R8', 'R9', 'G1', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'N1', 'N2', 'N4', 'N5', 'N6', 'N7')`);
        await queryRunner.query(`ALTER TABLE "location" ADD "fire_zone" "public"."fire-zone"`);
        await queryRunner.query(`CREATE TYPE "public"."travel_preference" AS ENUM('REMOTE_ONLY', 'WILLING_TO_TRAVEL_HOME_LOCATION', 'WILLING_TO_TRAVEL_FIRE_ZONE', 'WILLING_TO_TRAVEL_REGION', 'WILLING_TO_TRAVEL_ANYWHERE')`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "travel_preference" "public"."travel_preference" NOT NULL DEFAULT 'WILLING_TO_TRAVEL_HOME_LOCATION'`);
        await queryRunner.query(`UPDATE "personnel" SET "travel_preference" = 'WILLING_TO_TRAVEL_ANYWHERE' WHERE "willing_to_travel" = true`);
        await queryRunner.query(`UPDATE "personnel" SET "travel_preference" = 'REMOTE_ONLY' WHERE "remote_only" = true`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "remote_only"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "willing_to_travel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel" ADD "willing_to_travel" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "remote_only" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`UPDATE "personnel" SET "remote_only" = true WHERE "travel_preference" = 'REMOTE_ONLY'`);
        await queryRunner.query(`UPDATE "personnel" SET "willing_to_travel" = true WHERE "travel_preference" = 'WILLING_TO_TRAVEL_ANYWHERE'`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "travel_preference"`);
        await queryRunner.query(`DROP TYPE "public"."travel_preference"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "fire_zone"`);
        await queryRunner.query(`DROP TYPE "public"."fire-zone"`);
    }

}
