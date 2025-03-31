import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCertsMigration1743013336475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update certification set name = 'First Aid Level I' where name = 'OFA I'`,
    );
    await queryRunner.query(
      `update certification set name = 'First Aid Level II' where name = 'OFA II'`,
    );
    await queryRunner.query(
      `update certification set name = 'First Aid Level III' where name = 'OFA III'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `update certification set name = 'OFA I' where name = 'First Aid Level I'`,
    );
    await queryRunner.query(
      `update certification set name = 'OFA II' where name = 'First Aid Level II'`,
    );
    await queryRunner.query(
      `update certification set name = 'OFA III' where name = 'First Aid Level III'`,
    );
  }
}
