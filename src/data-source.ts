import 'dotenv/config';
import { join } from 'node:path';
import { DataSource } from 'typeorm';

// Paths are relative to this compiled file (dist/data-source.js), so the same
// config works on a laptop and inside the Docker image. Real environment
// variables (e.g. from docker compose) win over values in .env.
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(import.meta.dirname, '**/*.entity.js')],
  migrations: [join(import.meta.dirname, 'migrations/*.js')],
  synchronize: false,
});
