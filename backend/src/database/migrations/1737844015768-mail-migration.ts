import { MigrationInterface, QueryRunner } from 'typeorm';

export class MailMigration1737844015768 implements MigrationInterface {
  name = 'MailMigration1737844015768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mail" ("date" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "txId" character varying NOT NULL, "email" character varying NOT NULL, "msgId" character varying NOT NULL, "sent" boolean NOT NULL DEFAULT false, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0e1f88eaf848f230365f9149443" PRIMARY KEY ("txId", "msgId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mail_batch" ("date" TIMESTAMP NOT NULL DEFAULT now(), "txId" character varying NOT NULL, "tag" character varying NOT NULL, "template" character varying NOT NULL, CONSTRAINT "PK_96b067ccb9e11fa1a587a3a4123" PRIMARY KEY ("txId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail" ADD CONSTRAINT "FK_a3df257366ab9ea918ffdeb5a6e" FOREIGN KEY ("txId") REFERENCES "mail_batch"("txId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mail" DROP CONSTRAINT "FK_a3df257366ab9ea918ffdeb5a6e"`,
    );
    await queryRunner.query(`DROP TABLE "mail_batch"`);
    await queryRunner.query(`DROP TABLE "mail"`);
  }
}
