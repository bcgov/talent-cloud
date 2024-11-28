import { MigrationInterface, QueryRunner } from 'typeorm';

export class CertsToolsMigration1732663788650 implements MigrationInterface {
  name = 'CertsToolsMigration1732663788650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_language" RENAME TO "personnel_language"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_tools" RENAME TO "tool"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_tools" RENAME TO "personnel_tools"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_certification" RENAME TO "certification"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "bcws_personnel_certifications" RENAME TO "personnel_certifications"`,
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
      `ALTER TABLE "personnel_language" ADD CONSTRAINT "FK_68739753d112b6d9a147ab95b5f" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_63dd347bf4d1b3fe8f597066d05" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_0132f7c03a4c0724aaf2c2d986b" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_last_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_phone_number"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP COLUMN "emergency_contact_relationship"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_relationship" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_phone_number" character varying(10)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_last_name" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD "emergency_contact_first_name" character varying(50)`,
    );

    await queryRunner.query(
      `UPDATE bcws_personnel SET bcws_personnel.emergency_contact_first_name = personnel.emergency_contact_first_name FROM personnel WHERE bcws_personnel.personnel_id = personnel.id`,
    );
    await queryRunner.query(
      `UPDATE bcws_personnel SET bcws_personnel.emergency_contact_last_name = personnel.emergency_contact_last_name FROM personnel WHERE bcws_personnel.personnel_id = personnel.id`,
    );
    await queryRunner.query(
      `UPDATE bcws_personnel SET bcws_personnel.emergency_contact_phone_number = personnel.emergency_contact_phone_number FROM personnel WHERE bcws_personnel.personnel_id = personnel.id`,
    );
    await queryRunner.query(
      `UPDATE bcws_personnel SET bcws_personnel.emergency_contact_relationship = personnel.emergency_contact_relationship FROM personnel WHERE bcws_personnel.personnel_id = personnel.id`,
    );

    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_0132f7c03a4c0724aaf2c2d986b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_63dd347bf4d1b3fe8f597066d05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personnel_language" DROP CONSTRAINT "FK_68739753d112b6d9a147ab95b5f"`,
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
      `ALTER TABLE IF EXISTS "personnel_language" RENAME TO "bcws_personnel_language"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "tool" RENAME TO "bcws_tools"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "personnel_tools" RENAME TO "bcws_personnel_tools"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "certification" RENAME TO "bcws_certification"`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS "personnel_certifications" RENAME TO "bcws_personnel_certifications"`,
    );
  }
}
