import { BullModule } from '@nestjs/bullmq';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { Task } from './task.entity.js';
import { TasksController } from './tasks.controller.js';
import { TaskNotificationsListener } from './tasks/task-notifications.listener.js';
import { TaskStatsListener } from './tasks/task-stats.listener.js';
import { TasksProcessor } from './tasks/tasks.processor.js';
import { TasksService } from './tasks.service.js';
import { User } from './users/user.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: Number(config.get('REDIS_PORT', 6379)),
        },
      }),
    }),
    BullModule.registerQueue({ name: 'tasks' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Task, User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN') ?? '1h',
        },
      }),
    }),
  ],
  controllers: [AppController, TasksController, AuthController],
  providers: [
    AppService,
    TasksService,
    AuthService,
    TaskNotificationsListener,
    TaskStatsListener,
    TasksProcessor,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger('Database');

  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log(
        `Connected to database "${this.dataSource.options.database}" successfully`,
      );
    }
  }
}
