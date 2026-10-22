var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
let TasksController = class TasksController {
    tasks = [
        { id: 1, title: 'Install Node.js and VS Code', done: true },
        { id: 2, title: 'Create the mytasks Nest project', done: true },
        { id: 3, title: 'Build the TasksController', done: true },
        { id: 4, title: 'Finish the bootcamp assignment', done: false },
        { id: 5, title: 'Push the project to GitHub', done: false },
    ];
    findAll() {
        return this.tasks;
    }
    getWelcome() {
        return {
            message: 'Welcome to MyTasks! Your task list starts here.',
        };
    }
    findTodo() {
        return this.tasks.filter((task) => task.done === false);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
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
TasksController = __decorate([
    Controller('tasks')
], TasksController);
export { TasksController };
//# sourceMappingURL=tasks.controller.js.map