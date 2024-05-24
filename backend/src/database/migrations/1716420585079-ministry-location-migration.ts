import { MigrationInterface, QueryRunner } from "typeorm"

export class MinistryLocationMigration1716420585079 implements MigrationInterface {
    name='MinistryLocationMigration1716420585079'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table personnel add column work_location int4`)
        
        await queryRunner.query(`alter table personnel add column home_location int4`)
        
        await queryRunner.query(`
            ALTER TABLE "personnel" ADD CONSTRAINT "FK_276679ced4e823b3b6058335091" FOREIGN KEY ("work_location") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
        
        await queryRunner.query(`
            ALTER TABLE "personnel" 
            ADD CONSTRAINT "FK_75543e02cab09a4849d7fa61ae6" FOREIGN KEY ("home_location") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO action
        `)
        
        await queryRunner.query(`
            update personnel 
            set work_location=subquery.id  
            from (select l.id, ep2.personnel_id from location l join emcr_personnel ep2 on l.location_name = ep2.work_location and l.region = ep2.work_region) as subquery
            where personnel.id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update personnel 
            set home_location=subquery.id  
            from (select l.id, ep2.personnel_id from location l join emcr_personnel ep2 on l.location_name = ep2.home_location ) as subquery
            where personnel.id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update personnel 
            set work_location=subquery.id  
            from (select l.id, ep2.personnel_id from location l join bcws_personnel ep2 on l.id= ep2.work_fire_centre) as subquery
            where personnel.id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update personnel 
            set home_location=subquery.id  
            from (select l.id, ep2.personnel_id from location l join bcws_personnel ep2 on l.id= ep2.home_fire_centre) as subquery
            where personnel.id = subquery.personnel_id
        `)
        await queryRunner.query(`alter table bcws_personnel  drop column work_fire_centre`)
        await queryRunner.query(`alter table bcws_personnel  drop column home_fire_centre`)
        await queryRunner.query(`alter table emcr_personnel  drop column home_region`)
        await queryRunner.query(`alter table emcr_personnel  drop column work_region`)
        await queryRunner.query(`alter table emcr_personnel  drop column home_location`)
        await queryRunner.query(`alter table emcr_personnel  drop column work_location`)
        

        await queryRunner.query(`alter table emcr_personnel  add column ministry "public"."ministry"`)

        await queryRunner.query(`
            update emcr_personnel set ministry = subquery.ministry
            from (select ministry,id from personnel ) as subquery
            where emcr_personnel.personnel_id = subquery.id
        `)

        await queryRunner.query(`alter table personnel  drop column ministry`)

        
        await queryRunner.query(`ALTER TABLE "emcr_personnel" ALTER COLUMN "ministry" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personnel" DROP CONSTRAINT "FK_75543e02cab09a4849d7fa61ae6"`);

        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "driver_licenses" TYPE text`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "home_location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "personnel" ADD CONSTRAINT "FK_75543e02cab09a4849d7fa61ae6" FOREIGN KEY ("home_location") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "bcws_personnel" ALTER COLUMN "paylist_id" TYPE character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bcws_personnel" ALTER COLUMN "paylist_id" TYPE character varying(6)`);

        await queryRunner.query(`alter table personnel  add column ministry "public"."ministry"`)

        await queryRunner.query(`
            update personnel set ministry = subquery.ministry
            from (select ministry,personnel_id from emcr_personnel ) as subquery
            where personnel.id = subquery.personnel_id
        `)

        await queryRunner.query(`alter table emcr_personnel  drop column ministry`)
        await queryRunner.query(`ALTER table emcr_personnel add column work_location character varying(100)`) 
        await queryRunner.query(`ALTER table emcr_personnel add column "work_region" "public"."region"`), 
        await queryRunner.query(`ALTER table emcr_personnel add column "home_location" character varying(100) NOT NULL`),
        await queryRunner.query(`ALTER table emcr_personnel add column "home_region" "public"."region" NOT NULL`)
        
        await queryRunner.query(`alter table bcws_personnel  add column home_fire_centre int4`)
        await queryRunner.query(`alter table bcws_personnel  add column work_fire_centre int4`)
        
        await queryRunner.query(`
            update emcr_personnel 
            set work_location=subquery.location_name  
            from (select l.location_name, ep2.id  as personnel_id from location l join personnel ep2 on l.id = ep2.work_location ) as subquery
            where emcr_personnel.personnel_id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update emcr_personnel 
            set home_location=subquery.location_name 
            from (select l.location_name, ep2.id as personnel_id from location l join personnel ep2 on l.id = ep2.home_location ) as subquery
            where emcr_personnel.personnel_id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update emcr_personnel 
            set work_region=subquery.region
            from (select l.region, ep2.id  as personnel_id from location l join personnel ep2 on l.id = ep2.work_location ) as subquery
            where emcr_personnel.personnel_id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update emcr_personnel 
            set home_region=subquery.region
            from (select l.region, ep2.id as personnel_id from location l join personnel ep2 on l.id = ep2.home_location ) as subquery
            where emcr_personnel.personnel_id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update bcws_personnel 
            set work_fire_centre=subquery.id  
            from (select l.id, ep2.id as personnel_id from location l join personnel ep2 on l.id = ep2.work_location ) as subquery
            where bcws_personnel.personnel_id = subquery.personnel_id
        `)
        await queryRunner.query(`
            update bcws_personnel 
            set home_fire_centre=subquery.id  
            from (select l.id, ep2.id as personnel_id from location l join personnel ep2 on l.id = ep2.home_location ) as subquery
            where bcws_personnel.personnel_id = subquery.personnel_id
        `)
        
        await queryRunner.query(`ALTER TABLE "personnel" DROP CONSTRAINT "FK_276679ced4e823b3b6058335091"`)
        
        await queryRunner.query(`alter table personnel drop column work_location`)
        await queryRunner.query(`alter table personnel drop column home_location`)

       
        
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "driver_licenses" TYPE character varying(100)`);
        await queryRunner.query(`Drop type "public"."driver_license"`)
        await queryRunner.query(
            `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_f6648c7a27642f55140b234f8d6" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
          );
          await queryRunner.query(
            `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_c61edbd76d002f98a06ea636c2d" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
          );
    }

}
