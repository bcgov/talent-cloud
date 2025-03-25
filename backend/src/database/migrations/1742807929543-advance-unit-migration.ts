import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdvanceUnitMigration1742807929543 implements MigrationInterface {
  name = 'AdvanceUnitMigration1742807929543';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "emcr_function" SET name = 'Advance Planning Unit' WHERE name = 'Advanced Planning Unit';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "emcr_function" SET name = 'Advanced Planning Unit' WHERE name = 'Advance Planning Unit';`,
    );
  }
}
