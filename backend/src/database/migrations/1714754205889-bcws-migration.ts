import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714754205889 implements MigrationInterface {
  name = 'BcwsMigration1714754205889';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bcws_certification" ("id" integer NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_b7f42da6dc2c22f47c36b6b7e0f" UNIQUE ("name"), CONSTRAINT "PK_9b19c6f72ba39e8ef498bad37e6" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws-tools" AS ENUM(
        'ADOBE',
        'CAS',
        'DEC',
        'EXCEL',
        'FACE',
        'IMIS',
        'RRT',
        'VISIO'
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_tools" ("id" integer NOT NULL, "name" "public"."bcws-tools" NOT NULL, CONSTRAINT "PK_2aa1d18f606874e74e47f5a23cc" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."fire-centre" AS ENUM('CARIBOO', 'COASTAL', 'KAMLOOPS', 'NORTHWEST', 'PRINCE_GEORGE', 'SOUTHEAST')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_location" ("id" integer NOT NULL, "location_name" character varying(100), "fire_centre" "public"."fire-centre" NOT NULL, CONSTRAINT "UQ_054c7ec806fa319a2dc1006b105" UNIQUE ("location_name"), CONSTRAINT "UQ_FC_LOCATION" UNIQUE ("location_name", "fire_centre"), CONSTRAINT "PK_c37bc07ba0cbc41074533d2273a" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_certifications" ("personnel_id" uuid NOT NULL, "certification_id" integer NOT NULL, "expiry_date" date, CONSTRAINT "PK_f5bac785f7dd96424dbac3088d6" PRIMARY KEY ("personnel_id", "certification_id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws-role" AS ENUM('DEMOBILIZATION_UNIT_LEADER', 'DOCUMENTATION_UNIT_LEADER', 'FIRE_BEHAVIOUR_SPECIALIST', 'GIS_SPECIALIST', 'PLANNING_ASSISTANT', 'PLANS_OFFICER', 'PLANS_SECTION_CHIEF', 'REHAB_SPECIALIST', 'RESOURCE_UNIT_LEADER', 'SITUATION_UNIT_LEADER', 'ASSET_MANAGEMENT', 'CAMP_MANAGER', 'COMMUNICATION_UNIT_LEADER', 'CONTRACT_MONITOR', 'DISPATCHER', 'FACILITIES_UNIT_LEADER', 'FOOD_UNIT_LEADER', 'GROUND_SUPPORT_UNIT_LEADER', 'LOGISTICS_ASSISTANT', 'LOGISTICS_OFFICER', 'LOGISTICS_SECTION_CHIEF', 'MEDICAL_UNIT_LEADER', 'SERVICE_BRANCH_DIRECTOR', 'SUPPLY_UNIT_LEADER', 'SUPPORT_BRANCH_DIRECTOR', 'WAREHOUSE_MANAGER', 'ACCOUNTS_PAYABLE', 'COMPENSATION_CLAIMS_UNIT_LEADER', 'CONTRACT_ADMINISTRATION', 'COST_UNIT_LEADER', 'FINANCE_ASSISTANT', 'FINANCE_LIAISON', 'FINANCE_OFFICER', 'FINANCE_SECTION_CHIEF', 'PROCUREMENT_UNIT_LEADER', 'TIME_RECORDER', 'TIME_UNIT_LEADER', 'DIVISION_SUPERVISOR', 'EQUIPMENT_BRANCH_DIRECTOR', 'EQUIPMENT_GROUP_SUPERVISOR', 'LINE_LOCATOR', 'STRIKE_TEAM_LEADER', 'TASK_FORCE_LEADER', 'INFORMATION_ASSISTANT', 'INFORMATION_OFFICER', 'LIAISON_OFFICER', 'SAFETY_OFFICER', 'AVIATION_ASSISTANT', 'HELI_COORDINATOR', 'HELIBASE_MANAGER')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws-role-section" AS ENUM('PLANNING', 'LOGISTICS', 'FINANCE_ADMIN', 'OPERATIONS', 'COMMAND', 'AVIATION')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_role" ("id" integer NOT NULL, "name" "public"."bcws-role" NOT NULL, "section" "public"."bcws-role-section" NOT NULL, CONSTRAINT "PK_8085c37cddd6bc7755e8d807c87" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."role-experience-level" AS ENUM('PREVIOUSLY_DEPLOYED', 'INTERESTED')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_roles" ("personnel_id" uuid NOT NULL, "role_id" integer NOT NULL, "exp_level" "public"."role-experience-level" NOT NULL, CONSTRAINT "PK_931c10cb48762e411b5461b94e7" PRIMARY KEY ("personnel_id", "role_id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."tools-proficiency" AS ENUM('Basic', 'Intermediate', 'Advanced')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_tools" ("personnel_id" uuid NOT NULL, "tool_id" integer NOT NULL, "level" "public"."tools-proficiency" NOT NULL, CONSTRAINT "PK_ca42c285205618533b456cc03ba" PRIMARY KEY ("personnel_id", "tool_id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ofa" AS ENUM('OFA_I', 'OFA_II', 'OFA_III')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel" ("personnel_id" uuid NOT NULL, "status" "public"."status" NOT NULL, "employee_id" character varying(6) NOT NULL, "date_applied" TIMESTAMP, "date_approved" TIMESTAMP, "approved_by_supervisor" boolean NOT NULL DEFAULT false, "purchase_card_holder" boolean NOT NULL DEFAULT false, "paylist_id" character varying(6) NOT NULL, "liason_first_name" character varying(50), "liason_last_name" character varying(50), "liason_phone_number" character varying(10), "liason_email" character varying(50), "coordinator_notes" text, "logistics_notes" text, "willingess_statement" boolean NOT NULL DEFAULT false, "par_q" boolean NOT NULL DEFAULT false, "workplace_policy" boolean NOT NULL DEFAULT false, "orientation" boolean NOT NULL DEFAULT false, "work_fire_centre" integer, "home_fire_centre" integer NOT NULL, CONSTRAINT "PK_2ddf70585d0507b08e800568780" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."language-proficiency" AS ENUM('BASIC', 'INTERMEDIATE', 'FLUENT')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."language-fluency-type" AS ENUM('VERBAL', 'WRITTEN', 'BOTH')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_language" ("personnel_id" uuid NOT NULL, "language" character varying(50) NOT NULL, "level" "public"."language-proficiency" NOT NULL, "level_type" "public"."language-fluency-type" NOT NULL, CONSTRAINT "PK_84e834ee0e921d47e11b5c6bd29" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "id" DROP DEFAULT`,
    );

    await queryRunner.query(`DROP SEQUENCE "location_id_seq"`);

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_certifications" ADD CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_certifications" ADD CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c" FOREIGN KEY ("certification_id") REFERENCES "bcws_certification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_roles" ADD CONSTRAINT "FK_fd34a35c444ab2f48067b7b5e89" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`ALTER TABLE "bcws_personnel_roles" ADD CONSTRAINT "FK_8a88071c0954a35b09a33c61411" FOREIGN KEY ("role_id") 
    REFERENCES "bcws_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" ADD CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" ADD CONSTRAINT "FK_431a4dccb518fae099202377260" FOREIGN KEY ("tool_id") REFERENCES "bcws_tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_2ddf70585d0507b08e800568780" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_874eebc6d744a86c688612247c5" FOREIGN KEY ("work_fire_centre") REFERENCES "bcws_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_4497c09d4ea63c7187360afc685" FOREIGN KEY ("home_fire_centre") REFERENCES "bcws_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_4497c09d4ea63c7187360afc685"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_874eebc6d744a86c688612247c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_2ddf70585d0507b08e800568780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" DROP CONSTRAINT "FK_431a4dccb518fae099202377260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" DROP CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f"`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_roles" DROP CONSTRAINT "FK_8a88071c0954a35b09a33c61411"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_roles" DROP CONSTRAINT "FK_fd34a35c444ab2f48067b7b5e89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_certifications" DROP CONSTRAINT "FK_cd97407a0849edfe2d1b51d794c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_certifications" DROP CONSTRAINT "FK_ee076e36e564a46e1d0f7fc6651"`,
    );

    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "location_id_seq" OWNED BY "location"."id"`,
    );

    await queryRunner.query(
      `ALTER TABLE "location" ALTER COLUMN "id" SET DEFAULT nextval('"location_id_seq"')`,
    );

    await queryRunner.query(`DROP TABLE "bcws_personnel_language"`);
    await queryRunner.query(`DROP TYPE "public"."language-fluency-type"`);
    await queryRunner.query(`DROP TYPE "public"."language-proficiency"`);
    await queryRunner.query(`DROP TABLE "bcws_personnel"`);

    await queryRunner.query(`DROP TYPE "public"."ofa"`);
    await queryRunner.query(`DROP TYPE "public"."status"`);
    await queryRunner.query(`DROP TABLE "bcws_personnel_tools"`);
    await queryRunner.query(`DROP TYPE "public"."tools-proficiency"`);
    await queryRunner.query(`DROP TABLE "bcws_personnel_roles"`);
    await queryRunner.query(`DROP TYPE "public"."role-experience-level"`);
    await queryRunner.query(`DROP TABLE "bcws_role"`);
    await queryRunner.query(`DROP TYPE "public"."bcws-role-section"`);
    await queryRunner.query(`DROP TABLE "bcws_personnel_certifications"`);
    await queryRunner.query(`DROP TABLE "bcws_location"`);
    await queryRunner.query(`DROP TYPE "public"."fire-centre"`);
    await queryRunner.query(`DROP TABLE "bcws_tools"`);
    await queryRunner.query(`DROP TYPE "public"."bcws-tools"`);
    await queryRunner.query(`DROP TABLE "bcws_certification"`);
    await queryRunner.query(`DROP TYPE "public"."bcws-role"`);
  }
}
