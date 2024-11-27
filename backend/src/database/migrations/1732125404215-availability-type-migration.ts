import { MigrationInterface, QueryRunner } from 'typeorm';

export class AvailabilityTypeMigration1732125404215
  implements MigrationInterface
{
  name = 'AvailabilityTypeMigration1732125404215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from availability where availability_type in ('AVAILABLE', 'NOT_INDICATED');`,
    );
    await queryRunner.query(
      `alter type "availability-type" rename to "availability_old";`,
    );
    await queryRunner.query(
      `create type "availability-type" as enum ('UNAVAILABLE', 'DEPLOYED');`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type drop not null;`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type drop default;`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type type "availability-type" using availability_type::text::"availability-type";`,
    );
    await queryRunner.query(`drop type availability_old;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter type "availability-type" rename to "availability_old";`,
    );
    await queryRunner.query(
      `create type "availability-type" as enum ('UNAVAILABLE', 'DEPLOYED', 'AVAILABLE', 'NOT_INDICATED');`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type type "availability-type" using availability_type::text::"availability-type";`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type set not null;`,
    );
    await queryRunner.query(
      `alter table availability alter column availability_type set default 'NOT_INDICATED';`,
    );
    await queryRunner.query(`drop type availability_old;`);
  }
}
