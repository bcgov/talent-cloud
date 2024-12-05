import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployyAndPaylistIDMigration1733434087123 implements MigrationInterface {
    name = 'EmployyAndPaylistIDMigration1733434087123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "personnel" ADD "employee_id" character varying(6)`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD "paylist_id" character varying(50)`);

        await queryRunner.query(`UPDATE personnel SET employee_id = bcws_personnel.employee_id FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`)
        await queryRunner.query(`UPDATE personnel SET paylist_id = bcws_personnel.paylist_id FROM bcws_personnel WHERE personnel.id = bcws_personnel.personnel_id`)
        

        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" DROP COLUMN "paylist_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
   
   
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "paylist_id" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ADD "employee_id" character varying(6) NOT NULL`);

        await queryRunner.query(`UPDATE bcws_personnel SET employee_id = personnel.employee_id FROM personnel WHERE personnel.id = bcws_personnel.personnel_id`)
        await queryRunner.query(`UPDATE bcws_personnel SET paylist_id = personnel.paylist_id FROM personnel WHERE personnel.id = bcws_personnel.personnel_id`)

        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "paylist_id"`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP COLUMN "employee_id"`)
    }

}
