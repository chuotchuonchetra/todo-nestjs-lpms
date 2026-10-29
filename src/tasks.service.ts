import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(title: string) {
    const task = this.tasksRepository.create({ title });
    const saved = await this.tasksRepository.save(task);
    this.logger.debug(`New task title: "${title}"`);
    this.logger.log(`Task ${saved.id} created`);
    return saved;
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
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      this.logger.warn(`Task ${id} requested but not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: number, done: boolean) {
    const task = await this.findOne(id);
    task.done = done;
    const saved = await this.tasksRepository.save(task);
    this.logger.log(`Task ${id} updated (done=${done})`);
    return saved;
  }

  async remove(id: number) {
    const result = await this.tasksRepository.delete(id);
    if (!result.affected) {
      this.logger.warn(`Task ${id} requested for delete but not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.logger.log(`Task ${id} deleted`);
    return {
      message: `Task ${id} removed successfully`,
    };
  }
}
