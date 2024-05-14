import { MigrationInterface, QueryRunner } from 'typeorm';

export class DivisionMigration1715451072374 implements MigrationInterface {
  name = 'DivisionMigration1715451072374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_82d10a9214cb76928b89eca527a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "REL_82d10a9214cb76928b89eca527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_82d10a9214cb76928b89eca527a" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_82d10a9214cb76928b89eca527a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "REL_82d10a9214cb76928b89eca527" UNIQUE ("division_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_82d10a9214cb76928b89eca527a" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
