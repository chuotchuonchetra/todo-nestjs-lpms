import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Point the app at the mytasks_test database instead of the real one
    env: parse(readFileSync('.env.test')),
    // Both e2e files share one test database, so run them one at a time
    fileParallelism: false,
  },
});
