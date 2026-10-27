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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
let TasksService = class TasksService {
    tasksRepository;
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(title) {
        const task = this.tasksRepository.create({ title });
        return this.tasksRepository.save(task);
    }
    async findAll() {
        return this.tasksRepository.find({ order: { id: 'ASC' } });
    }
    async findTodo() {
        return this.tasksRepository.find({
            where: { done: false },
            order: { id: 'ASC' },
        });
    }
    async findDone() {
        return this.tasksRepository.find({
            where: { done: true },
            order: { id: 'ASC' },
        });
    }
    async findOne(id) {
        return (await this.tasksRepository.findOneBy({ id })) ?? undefined;
    }
    async update(id, done) {
        const task = await this.findOne(id);
        if (!task) {
            return undefined;
        }
        task.done = done;
        return this.tasksRepository.save(task);
    }
    async remove(id) {
        const task = await this.findOne(id);
        if (!task) {
            return undefined;
        }
        await this.tasksRepository.remove(task);
        return {
            message: `Task ${id} removed successfully`,
        };
    }
};
TasksService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Task)),
    __metadata("design:paramtypes", [Repository])
], TasksService);
export { TasksService };
//# sourceMappingURL=tasks.service.js.map