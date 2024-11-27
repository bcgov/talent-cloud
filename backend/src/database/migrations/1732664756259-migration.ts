import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732664756259 implements MigrationInterface {
    name = 'Migration1732664756259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_431a4dccb518fae099202377260"`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f"`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c"`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "personnel_language_id_seq" OWNED BY "personnel_language"."id"`);
        await queryRunner.query(`ALTER TABLE "personnel_language" ALTER COLUMN "id" SET DEFAULT nextval('"personnel_language_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "personnel_language" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "tools_id_seq" OWNED BY "tools"."id"`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "id" SET DEFAULT nextval('"tools_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "certification_id_seq" OWNED BY "certification"."id"`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "id" SET DEFAULT nextval('"certification_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ALTER COLUMN "travel_preference" SET DEFAULT 'WILLING_TO_TRAVEL_HOME_LOCATION'`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personnel_certifications" DROP CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087"`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" DROP CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53"`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "id" SET DEFAULT nextval('bcws_certification_id_seq')`);
        await queryRunner.query(`ALTER TABLE "certification" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "certification_id_seq"`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_62cef66e020ea3a1d90fd0c4087" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "travel_preference" SET DEFAULT 'WILLING_TO_TRAVEL_UNKNOWN'`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "id" SET DEFAULT nextval('bcws_tools_id_seq')`);
        await queryRunner.query(`ALTER TABLE "tools" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tools_id_seq"`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_65844d0c28077778e4b1d6c4f53" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_language" ALTER COLUMN "id" SET DEFAULT nextval('bcws_personnel_language_id_seq')`);
        await queryRunner.query(`ALTER TABLE "personnel_language" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "personnel_language_id_seq"`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_certifications" ADD CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c" FOREIGN KEY ("certification_id") REFERENCES "certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_tools" ADD CONSTRAINT "FK_431a4dccb518fae099202377260" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
