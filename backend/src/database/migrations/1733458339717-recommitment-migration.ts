import { MigrationInterface, QueryRunner } from "typeorm";

export class RecommitmentMigration1733458339717 implements MigrationInterface {
    name = 'RecommitmentMigration1733458339717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "PK_fea6502c12c7d50eec34d3a9ab2" CASCADE`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec" PRIMARY KEY ("member", "year")`);
        
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8"`);
        await queryRunner.query(`ALTER TABLE "recommitment" ALTER COLUMN "year" SET NOT NULL`);
        
        
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec" UNIQUE ("member", "year")`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "FK_fea6502c12c7d50eec34d3a9ab2" FOREIGN KEY ("member") REFERENCES "personnel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8" FOREIGN KEY ("year") REFERENCES "recommitment_cycle"("year") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8"`);
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "FK_fea6502c12c7d50eec34d3a9ab2"`);
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "UQ_4535ecaec2a3ff614c0d4a9cbec"`);
        
        await queryRunner.query(`ALTER TABLE "recommitment" ALTER COLUMN "year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "FK_1ff108632f076e6d4cdc2e338b8" FOREIGN KEY ("year") REFERENCES "recommitment_cycle"("year") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        await queryRunner.query(`ALTER TABLE "recommitment" DROP CONSTRAINT "PK_4535ecaec2a3ff614c0d4a9cbec" CASCADE`);
        await queryRunner.query(`ALTER TABLE "recommitment" ADD CONSTRAINT "PK_fea6502c12c7d50eec34d3a9ab2" PRIMARY KEY ("member")`);
    }

}
