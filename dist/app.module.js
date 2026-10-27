var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Task } from './task.entity.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
let AppModule = class AppModule {
    dataSource;
    logger = new Logger('Database');
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    onModuleInit() {
        if (this.dataSource.isInitialized) {
            this.logger.log(`Connected to database "${this.dataSource.options.database}" successfully`);
        }
    }
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            TypeOrmModule.forFeature([Task]),
        ],
        controllers: [AppController, TasksController],
        providers: [AppService, TasksService],
    }),
    __metadata("design:paramtypes", [DataSource])
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map