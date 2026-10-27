import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1793110015932 implements MigrationInterface {
    name = 'CreateTasksTable1793110015932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "done" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
