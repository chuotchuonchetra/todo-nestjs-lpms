import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserPasswordToPasswordHash1793353118064 implements MigrationInterface {
  name = 'RenameUserPasswordToPasswordHash1793353118064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "password" TO "passwordHash"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password"`,
    );
  }
}
