import { MigrationInterface, QueryRunner } from "typeorm";

export class RankEmergencyContacts1715585079303 implements MigrationInterface {
    name = 'Rank-Emergency-Contacts1715585079303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel_roles" ADD "rank" integer NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "emergency_contact_first_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "emergency_contact_last_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "emergency_contact_phone_number" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "emergency_contact_relationship" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_relationship"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_phone_number"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_last_name"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_first_name"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel_roles" DROP COLUMN "rank"`);
    }

}
