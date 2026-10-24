var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let TasksService = class TasksService {
    tasks = [
        { id: 1, title: 'Install Node.js and VS Code', done: true },
        { id: 2, title: 'Create the mytasks Nest project', done: true },
        { id: 3, title: 'Build the TasksController', done: true },
        { id: 4, title: 'Finish the bootcamp assignment', done: false },
        { id: 5, title: 'Push the project to GitHub', done: false },
    ];
    nextId = 6;
    create(title) {
        const task = { id: this.nextId++, title, done: false };
        this.tasks.push(task);
        return task;
    }
    findAll() {
        return this.tasks;
    }
    findTodo() {
        return this.tasks.filter((task) => task.done === false);
    }
    findDone() {
        return this.tasks.filter((task) => task.done === true);
    }
    findOne(id) {
        return this.tasks.find((task) => task.id === id);
    }
    update(id, done) {
        const task = this.findOne(id);
        if (task) {
            task.done = done;
        }
        return task;
    }
    remove(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) {
            return undefined;
        }
        const [removed] = this.tasks.splice(index, 1);
        return {
            message: `Task ${removed.id} removed successfully`,
        };
    }
};
TasksService = __decorate([
    Injectable()
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map