import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditLogMigration1737094259888 implements MigrationInterface {
  name = 'AuditLogMigration1737094259888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "data" jsonb NOT NULL, "updatedBy" character varying NOT NULL, "entityId" character varying NOT NULL, CONSTRAINT "PK_1d3d120ddaf7bc9b1ed68ed463a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "audit"`);
  }
}
