import { MigrationInterface, QueryRunner } from "typeorm";

export class LocationNotNullMigration1715799647112 implements MigrationInterface {
    name = 'LocationNotNullMigration1715799647112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3"`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "region" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "fire_centre" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_region" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3"`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_region" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "home_location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "fire_centre" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "region" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ALTER COLUMN "location_name" DROP NOT NULL`)    
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
