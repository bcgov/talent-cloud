import { MigrationInterface, QueryRunner } from 'typeorm';

export class CertsToolsMigration1732829859521 implements MigrationInterface {
  name = 'CertsToolsMigration1732829859521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_language" RENAME TO "personnel_language"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "personnel_language_id_seq" OWNED BY "personnel_language"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ALTER COLUMN "id" SET DEFAULT nextval('"personnel_language_id_seq"')`,
    );

    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_tools" RENAME TO "tool"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_tools" RENAME TO "personnel_tools"`,
    );

    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "tool_id_seq" OWNED BY "tool"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "id" SET DEFAULT nextval('"tool_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."bcws-tools" RENAME TO "bcws-tools_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tools" AS ENUM('ADOBE', 'CAS', 'DEC', 'EXCEL', 'FACE', 'IMIS', 'RRT', 'VISIO')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "name" TYPE "public"."tools" USING "name"::"text"::"public"."tools"`,
    );
    await queryRunner.query(`DROP TYPE "public"."bcws-tools_old"`);
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_certification" RENAME TO "certification"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "certification_id_seq" OWNED BY "certification"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "certification" ALTER COLUMN "id" SET DEFAULT nextval('"certification_id_seq"')`,
    );

    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_certifications" RENAME TO "personnel_certifications"`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "emergency_contact_first_name" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "emergency_contact_last_name" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "emergency_contact_phone_number" character varying(10)`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" ADD "emergency_contact_relationship" character varying(50)`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_first_name = bcws_personnel.emergency_contact_first_name FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_last_name = bcws_personnel.emergency_contact_last_name FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_phone_number = bcws_personnel.emergency_contact_phone_number FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_relationship = bcws_personnel.emergency_contact_relationship FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );

    await queryRunner.query(
      `ALTER TABLE "recommitment_cycle" ADD CONSTRAINT "UQ_9bdc497efce5720701ba9245275" UNIQUE ("year")`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_phone_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_relationship"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("personnel_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_0132f7c03a4c0724aaf2c2d986b" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "FK_68739753d112b6d9a147ab95b5f" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_63dd347bf4d1b3fe8f597066d05" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_431a4dccb518fae099202377260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_431a4dccb518fae099202377260" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_63dd347bf4d1b3fe8f597066d05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "FK_68739753d112b6d9a147ab95b5f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_0132f7c03a4c0724aaf2c2d986b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_relationship" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_phone_number" character varying(10)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_first_name" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_last_name" character varying(50)`,
    );

    await queryRunner.query(
      `ALTER TABLE "recommitment_cycle" DROP CONSTRAINT "UQ_9bdc497efce5720701ba9245275"`,
    );

    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_relationship = bcws_personnel.emergency_contact_relationship FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_phone_number = bcws_personnel.emergency_contact_phone_number FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_last_name = bcws_personnel.emergency_contact_last_name FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `UPDATE personnel SET emergency_contact_first_name = bcws_personnel.emergency_contact_first_name FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "emergency_contact_relationship"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "emergency_contact_phone_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "emergency_contact_last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel" DROP COLUMN "emergency_contact_first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "personnel_certifications" RENAME TO "bcws_personnel_certifications"`,
    );
    await queryRunner.query(
      `ALTER TABLE "certification" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "certification_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "certification" RENAME TO "bcws_certification"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`,
    );

    await queryRunner.query(
      `ALTER TABLE "tool" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "tool_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "tool" RENAME TO "bcws_tools"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "personnel_tools" RENAME TO "bcws_personnel_tools"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."tools" RENAME TO "tools-old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bcws-tools" AS ENUM('ADOBE', 'CAS', 'DEC', 'EXCEL', 'FACE', 'IMIS', 'RRT', 'VISIO')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_tools" ALTER COLUMN "name" TYPE "public"."bcws-tools" USING "name"::"text"::"public"."bcws-tools"`,
    );
    await queryRunner.query(`DROP TYPE "public"."tools-old"`);

    await queryRunner.query(
      `ALTER TABLE "personnel_language" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `DROP SEQUENCE IF EXISTS "personnel_language_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "personnel_language" RENAME TO "bcws_personnel_language"`,
    );
  }
}
