import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThirdChoiceSectionMigration1737012316279
  implements MigrationInterface
{
  name = 'ThirdChoiceSectionMigration1737012316279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "third_choice_section" "public"."section"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD "first_choice_section" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD "second_choice_section" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD "third_choice_section" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "third_choice_section"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "second_choice_section"`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP COLUMN "first_choice_section"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "third_choice_section"`,
    );
  }
}
