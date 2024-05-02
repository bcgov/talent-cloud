import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714251724200 implements MigrationInterface {
  name = 'DropOldTablesMigration1714251724200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS function, location, personnel_function_experience, personnel_training, training`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public."function" (
            id serial4 NOT NULL,
            name varchar(100) NOT NULL,
            abbreviation varchar(10) NOT NULL,
            CONSTRAINT "PK_6e085d059b4227aab09e8a5b05e" PRIMARY KEY (id)
        );`);
    await queryRunner.query(`CREATE TABLE public."location" (
            id serial4 NOT NULL,
            location_name varchar(100) NULL,
            "region" public."region" NOT NULL,
            CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY (id),
            CONSTRAINT "UQ_9b2e88233cc89fe5a7c1c648c59" UNIQUE (location_name),
            CONSTRAINT "UQ_location" UNIQUE (location_name, region)
        );`);
    await queryRunner.query(`
            CREATE TABLE public.personnel_function_experience (
                personnel_id uuid NOT NULL,
                function_id int4 NOT NULL,
                experience_type public."experience" NOT NULL,
                CONSTRAINT "PK_ea23826f97ea6958cac2265c4bb" PRIMARY KEY (personnel_id, function_id),
                CONSTRAINT "FK_50a87e5f4e530849c6b7bcc6ca8" FOREIGN KEY (function_id) REFERENCES public."function"(id),
                CONSTRAINT "FK_68b71d04347540e680b4c26182f" FOREIGN KEY (personnel_id) REFERENCES public.personnel(id)
            );`);
    await queryRunner.query(`CREATE TABLE public.personnel_training (
                    "personnelId" uuid NOT NULL,
                    "trainingId" int4 NOT NULL,
                    CONSTRAINT "PK_bf54cf0cb8d644cc1cf6fd51990" PRIMARY KEY ("personnelId", "trainingId"),
                    CONSTRAINT "FK_3ca2f58b8d3e6542a0ef1e702a7" FOREIGN KEY ("trainingId") REFERENCES public.training(id) ON DELETE CASCADE ON UPDATE CASCADE,
                    CONSTRAINT "FK_e37cd98e86f078262068b6bfa8f" FOREIGN KEY ("personnelId") REFERENCES public.personnel(id) ON DELETE CASCADE ON UPDATE CASCADE
                );
                CREATE INDEX "IDX_3ca2f58b8d3e6542a0ef1e702a" ON public.personnel_training USING btree ("trainingId");
                CREATE INDEX "IDX_e37cd98e86f078262068b6bfa8" ON public.personnel_training USING btree ("personnelId");`);
    await queryRunner.query(`CREATE TABLE public.training (
                        id serial4 NOT NULL,
                        "name" varchar(100) NOT NULL,
                        CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY (id)
                    );`);
  }
}
