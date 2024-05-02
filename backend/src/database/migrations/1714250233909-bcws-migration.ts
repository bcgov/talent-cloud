import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714250233909 implements MigrationInterface {
  name = 'BcwsMigration1714250233909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."bcws_personnel_language_level_enum" AS ENUM('BASIC', 'INTERMEDIATE', 'FLUENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bcws_personnel_language_level_type_enum" AS ENUM('VERBAL', 'WRITTEN', 'BOTH')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_sections_and_roles_role_enum" AS ENUM('Demobilization Unit Leader ', 'Documentation Unit Leader', 'Fire Behaviour Specialist ', 'GIS Specialist', 'Planning Assistant ', 'Plans Officer ', 'Plans Section Chief ', 'Rehab Specialist ', 'Resource Unit Leader ', 'Situation Unit Leader ', 'Asset management ', 'Camp Manager ', 'Communication Unit Leader ', 'Contract Monitor ', 'Dispatcher ', 'Facilities Unit Leader ', 'Food Unit Leader ', 'Ground Support Unit Leader ', 'Logistics Assistant ', 'Logistics Officer ', 'Logistics Section Chief ', 'Medical Unit Leader ', 'Service Branch Director ', 'Supply Unit Leader ', 'Support Branch Director ', 'Warehouse Manager', 'Accounts Payable ', 'Compensation & Claims Unit Leader ', 'Contract Administration ', 'Cost Unit Leader ', 'Finance Assistant ', 'Finance Liaison ', 'Finance Officer ', 'Finance Section Chief ', 'Procurement Unit Leader ', 'Time Recorder ', 'Time Unit Leader ', 'Division Supervisor ', 'Equipment Branch Director ', 'Equipment Group Supervisor ', 'Line Locator ', 'Strike Team Leader ', 'Task Force Leader ', 'Information Assistant ', 'Information  Officer ', 'Liaison Officer ', 'Safety Officer ', 'Aviation Assistant ', 'Heli Coordinator ', 'Helibase Manager ')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_sections_and_roles_section_enum" AS ENUM('PLANNING', 'LOGISTICS', 'FINANCE_ADMIN', 'OPERATIONS', 'COMMAND', 'AVIATION')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bcws_sections_and_roles_exp_level_enum" AS ENUM('Previously_Deployed', 'Interested ')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_personnel_tools_tool_enum" AS ENUM('Adobe Pro', 'Corporate Accounting System (CAS)', 'Daily Estimated Costs/Wildfire Costing (DEC/WFCST)', 'Excel', 'Fire Analysis Cost Estimate (FACE)', 'Inventory Management (IMIS)', 'Resource Request Tracking (RRT)', 'Visio')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bcws_home_fire_centre_enum" AS ENUM('CARIBOO', 'COASTAL', 'KAMLOOPS', 'NORTHWEST', 'PRINCE GEORGE', 'SOUTHEAST')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bcws_work_fire_centre_enum" AS ENUM('CARIBOO', 'COASTAL', 'KAMLOOPS', 'NORTHWEST', 'PRINCE GEORGE', 'SOUTHEAST')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_highest_ofa_enum" AS ENUM('OFA_I', 'OFA_II', 'OFA_III')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_second_choice_role_enum" AS ENUM('Demobilization Unit Leader ', 'Documentation Unit Leader', 'Fire Behaviour Specialist ', 'GIS Specialist', 'Planning Assistant ', 'Plans Officer ', 'Plans Section Chief ', 'Rehab Specialist ', 'Resource Unit Leader ', 'Situation Unit Leader ', 'Asset management ', 'Camp Manager ', 'Communication Unit Leader ', 'Contract Monitor ', 'Dispatcher ', 'Facilities Unit Leader ', 'Food Unit Leader ', 'Ground Support Unit Leader ', 'Logistics Assistant ', 'Logistics Officer ', 'Logistics Section Chief ', 'Medical Unit Leader ', 'Service Branch Director ', 'Supply Unit Leader ', 'Support Branch Director ', 'Warehouse Manager', 'Accounts Payable ', 'Compensation & Claims Unit Leader ', 'Contract Administration ', 'Cost Unit Leader ', 'Finance Assistant ', 'Finance Liaison ', 'Finance Officer ', 'Finance Section Chief ', 'Procurement Unit Leader ', 'Time Recorder ', 'Time Unit Leader ', 'Division Supervisor ', 'Equipment Branch Director ', 'Equipment Group Supervisor ', 'Line Locator ', 'Strike Team Leader ', 'Task Force Leader ', 'Information Assistant ', 'Information  Officer ', 'Liaison Officer ', 'Safety Officer ', 'Aviation Assistant ', 'Heli Coordinator ', 'Helibase Manager ')`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."bcws_first_choice_role_enum" AS ENUM('Demobilization Unit Leader ', 'Documentation Unit Leader', 'Fire Behaviour Specialist ', 'GIS Specialist', 'Planning Assistant ', 'Plans Officer ', 'Plans Section Chief ', 'Rehab Specialist ', 'Resource Unit Leader ', 'Situation Unit Leader ', 'Asset management ', 'Camp Manager ', 'Communication Unit Leader ', 'Contract Monitor ', 'Dispatcher ', 'Facilities Unit Leader ', 'Food Unit Leader ', 'Ground Support Unit Leader ', 'Logistics Assistant ', 'Logistics Officer ', 'Logistics Section Chief ', 'Medical Unit Leader ', 'Service Branch Director ', 'Supply Unit Leader ', 'Support Branch Director ', 'Warehouse Manager', 'Accounts Payable ', 'Compensation & Claims Unit Leader ', 'Contract Administration ', 'Cost Unit Leader ', 'Finance Assistant ', 'Finance Liaison ', 'Finance Officer ', 'Finance Section Chief ', 'Procurement Unit Leader ', 'Time Recorder ', 'Time Unit Leader ', 'Division Supervisor ', 'Equipment Branch Director ', 'Equipment Group Supervisor ', 'Line Locator ', 'Strike Team Leader ', 'Task Force Leader ', 'Information Assistant ', 'Information  Officer ', 'Liaison Officer ', 'Safety Officer ', 'Aviation Assistant ', 'Heli Coordinator ', 'Helibase Manager ')`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel" ("personnel_id" uuid NOT NULL, "status" "public"."bcws_status_enum" NOT NULL, "employee_id" character varying(6) NOT NULL, "date_applied" TIMESTAMP, "date_approved" TIMESTAMP, "home_fire_centre" "public"."bcws_home_fire_centre_enum" NOT NULL, "work_fire_centre" "public"."bcws_work_fire_centre_enum" NOT NULL, "purchase_card_holder" boolean NOT NULL DEFAULT false, "paylist_id" character varying NOT NULL, "liason_first_name" character varying NOT NULL, "liason_last_name" character varying NOT NULL, "liason_phone_number" character varying NOT NULL, "liason_email" character varying NOT NULL, "coordinator_notes" character varying, "logistics_notes" character varying, "supervisor_approval" boolean NOT NULL DEFAULT false, "willingess_statement" boolean NOT NULL DEFAULT false, "par_q" boolean NOT NULL DEFAULT false, "workplace_policy" boolean NOT NULL DEFAULT false, "orientation" boolean NOT NULL DEFAULT false, "highest_ofa" "public"."bcws_highest_ofa_enum", "ofa_expiry" TIMESTAMP, "food_safety_I" boolean NOT NULL DEFAULT false, "food_safety_I_expiry" TIMESTAMP, "food_safety_II" boolean NOT NULL DEFAULT false, "food_safety_II_expiry" TIMESTAMP, "skills_comments" character varying, "second_choice_role" "public"."bcws_second_choice_role_enum" NOT NULL, "first_choice_role" "public"."bcws_first_choice_role_enum" NOT NULL, CONSTRAINT "PK_dec899123a819b787c4f80e4a4c" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_sections_and_roles" ("personnel_id" uuid NOT NULL, "role" "public"."bcws_sections_and_roles_role_enum" NOT NULL, "section" "public"."bcws_sections_and_roles_section_enum" NOT NULL, "exp_level" "public"."bcws_sections_and_roles_exp_level_enum" NOT NULL, CONSTRAINT "PK_387d9e80de4cdeac40d9bd6c867" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_tools" ("personnel_id" uuid NOT NULL, "tool" "public"."bcws_personnel_tools_tool_enum" NOT NULL, "level" character varying NOT NULL,  CONSTRAINT "PK_abed48152986db46ea2528622d8" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "bcws_personnel_language" ("personnel_id" uuid NOT NULL, "language" character varying NOT NULL, "level" "public"."bcws_personnel_language_level_enum" NOT NULL, "level_type" "public"."bcws_personnel_language_level_type_enum" NOT NULL,  CONSTRAINT "PK_e37ad1c812172d33a1b7d3762fb" PRIMARY KEY ("personnel_id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_language" ADD CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_sections_and_roles" ADD CONSTRAINT "FK_56c94b57753ccdab90bdec953d4" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" ADD CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f" FOREIGN KEY ("personnel_id") REFERENCES "bcws_personnel"("personnel_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_dec899123a819b787c4f80e4a4c" FOREIGN KEY ("personnel_id") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_dec899123a819b787c4f80e4a4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_tools" DROP CONSTRAINT "FK_b33c0a7ad2fbfd1fb459eae3f1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_sections_and_roles" DROP CONSTRAINT "FK_56c94b57753ccdab90bdec953d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel_language" DROP CONSTRAINT "FK_84e834ee0e921d47e11b5c6bd29"`,
    );

    await queryRunner.query(`DROP TABLE _personnel"bcws"`);
    await queryRunner.query(`DROP TYPE "public"."bcws_first_choice_role_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."bcws_second_choice_role_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."bcws_highest_ofa_enum"`);
    await queryRunner.query(`DROP TYPE "public"."bcws_work_fire_centre_enum"`);
    await queryRunner.query(`DROP TYPE "public"."bcws_home_fire_centre_enum"`);
    await queryRunner.query(`DROP TYPE "public"."bcws_status_enum"`);
    await queryRunner.query(`DROP TABLE "bcws_personnel_tools"`);
    await queryRunner.query(
      `DROP TYPE "public"."bcws_personnel_tools_tool_enum"`,
    );
    await queryRunner.query(`DROP TABLE "bcws_sections_and_roles"`);
    await queryRunner.query(
      `DROP TYPE "public"."bcws_sections_and_roles_exp_level_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."bcws_sections_and_roles_section_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."bcws_sections_and_roles_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "bcws_personnel_language"`);
    await queryRunner.query(
      `DROP TYPE "public"."bcws_personnel_language_level_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."bcws_personnel_language_level_enum"`,
    );
  }
}
