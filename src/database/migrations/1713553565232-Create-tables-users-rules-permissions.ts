import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesUsersRulesPermissions1713553565232 implements MigrationInterface {
    name = 'CreateTablesUsersRulesPermissions1713553565232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "insert" integer NOT NULL DEFAULT '0', "update" integer NOT NULL DEFAULT '0', "delete" integer NOT NULL DEFAULT '0', "view" integer NOT NULL DEFAULT '0', "ruleId" character varying, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rules" ("id" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "descricao" character varying NOT NULL, CONSTRAINT "PK_10fef696a7d61140361b1b23608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "cargo" character varying NOT NULL, "nomeusuario" character varying NOT NULL, "ruleId" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_8d964fe1a43db15d8afe0063662" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_75cda84bc861e8c1e862c10fe45" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_75cda84bc861e8c1e862c10fe45"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_8d964fe1a43db15d8afe0063662"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rules"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
