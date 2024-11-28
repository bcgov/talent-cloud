import { MigrationInterface, QueryRunner } from 'typeorm';

export class LanguageMigration1732758899056 implements MigrationInterface {
  name = 'LanguageMigration1732758899056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "certification_id_seq" OWNED BY "certification"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "certification" ALTER COLUMN "id" SET DEFAULT nextval('"certification_id_seq"')`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "personnel_language_id_seq" OWNED BY "personnel_language"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ALTER COLUMN "id" SET DEFAULT nextval('"personnel_language_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "tools_id_seq" OWNED BY "tool"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "id" SET DEFAULT nextval('"tools_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("personnel_id", "id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`,
    );

    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "tools_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "personnel_language_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "certification" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "certification_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
