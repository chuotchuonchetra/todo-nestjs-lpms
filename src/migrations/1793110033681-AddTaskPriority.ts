import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskPriority1793110033681 implements MigrationInterface {
    name = 'AddTaskPriority1793110033681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" character varying NOT NULL DEFAULT 'medium'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
    }

}
