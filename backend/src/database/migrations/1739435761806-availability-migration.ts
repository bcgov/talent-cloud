import { MigrationInterface, QueryRunner } from 'typeorm';

export class AvailabilityMigration1739435761806 implements MigrationInterface {
  name = 'AvailabilityMigration1739435761806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "availability" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "availability_confirmed_until" date`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "availability_confirmed_until"`,
    );
    await queryRunner.query(`ALTER TABLE "availability" DROP COLUMN "updated"`);
  }
}
