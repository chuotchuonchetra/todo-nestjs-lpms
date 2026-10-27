import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(title: string) {
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

  async findOne(id: number) {
    return (await this.tasksRepository.findOneBy({ id })) ?? undefined;
  }

  async update(id: number, done: boolean) {
    const task = await this.findOne(id);
    if (!task) {
      return undefined;
    }
    task.done = done;
    return this.tasksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      return undefined;
    }
    await this.tasksRepository.remove(task);
    return {
      message: `Task ${id} removed successfully`,
    };
  }
}
