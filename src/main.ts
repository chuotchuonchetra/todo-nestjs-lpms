import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const logLevels: LogLevel[] = isProduction
    ? ['log', 'warn', 'error']
    : ['log', 'warn', 'error', 'debug'];

  const app = await NestFactory.create(AppModule, { logger: logLevels });
  app.useGlobalPipes(new ValidationPipe());

  // Request logging: method, path, status and duration only (no headers or body).
  const httpLogger = new Logger('HTTP');
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      httpLogger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`,
      );
    });
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
