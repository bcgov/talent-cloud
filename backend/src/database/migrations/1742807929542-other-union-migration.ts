import { MigrationInterface, QueryRunner } from "typeorm";

export class OtherUnionMigration1742807929542 implements MigrationInterface {
    name = 'OtherUnionMigration1742807929542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."union_membership" RENAME TO "union_membership_old"`);
        await queryRunner.query(`CREATE TYPE "public"."union_membership" AS ENUM('BCGEU', 'EXCLUDED', 'PEA', 'OTHER')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "union_membership" TYPE "public"."union_membership" USING "union_membership"::"text"::"public"."union_membership"`);
        await queryRunner.query(`DROP TYPE "public"."union_membership_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."union_membership_old" AS ENUM('BCGEU', 'EXCLUDED', 'PEA')`);
        await queryRunner.query(`ALTER TABLE "personnel" ALTER COLUMN "union_membership" TYPE "public"."union_membership_old" USING "union_membership"::"text"::"public"."union_membership_old"`);
        await queryRunner.query(`DROP TYPE "public"."union_membership"`);
        await queryRunner.query(`ALTER TYPE "public"."union_membership_old" RENAME TO "union_membership"`);
    }

}
