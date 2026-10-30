import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

// Logs method, path, status and duration only (no headers or body).
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const start = Date.now();
    const route = `${request.method} ${request.originalUrl}`;

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log(
            `${route} ${response.statusCode} ${Date.now() - start}ms`,
          );
        },
        error: (error: unknown) => {
          const status =
            error instanceof HttpException ? error.getStatus() : 500;
          this.logger.warn(`${route} ${status} ${Date.now() - start}ms`);
        },
      }),
    );
  }
}
