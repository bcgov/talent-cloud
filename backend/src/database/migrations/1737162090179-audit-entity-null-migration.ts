import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditEntityNullMigration1737162090179
  implements MigrationInterface
{
  name = 'AuditEntityNullMigration1737162090179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit" ALTER COLUMN "entityId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit" ALTER COLUMN "entityId" SET NOT NULL`,
    );
  }
}
