var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    findAll() {
        return this.tasksService.findAll();
    }
    create(title) {
        return this.tasksService.create(title);
    }
    getWelcome() {
        return {
            message: 'Welcome to MyTasks! Your task list starts here.',
        };
    }
    findTodo() {
        return this.tasksService.findTodo();
    }
    findDone() {
        return this.tasksService.findDone();
    }
    whoIsAsking(agent) {
        return { userAgent: agent };
    }
    async getOneTask(id) {
        const taskPromise = await this.tasksService.findOne(id);
        console.log(taskPromise);
        return taskPromise;
    }
    update(id, done) {
        return this.tasksService.update(Number(id), done);
    }
    remove(id) {
        return this.tasksService.remove(Number(id));
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    Post(),
    __param(0, Body('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    Get('welcome'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getWelcome", null);
__decorate([
    Get('todo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findTodo", null);
__decorate([
    Get('done'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findDone", null);
__decorate([
    Get('agent'),
    __param(0, UserAgent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "whoIsAsking", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getOneTask", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body('done')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
TasksController = __decorate([
    Controller('tasks'),
    __metadata("design:paramtypes", [TasksService])
], TasksController);
export { TasksController };
//# sourceMappingURL=tasks.controller.js.map