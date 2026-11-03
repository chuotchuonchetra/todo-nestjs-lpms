import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
import { UpdateTaskDto } from './tasks/dto/update-task.dto.js';
import { TaskCreatedEvent } from './tasks/task-created.event.js';
import { TaskUpdatedEvent } from './tasks/task-updated.event.js';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(title: string) {
    const task = this.tasksRepository.create({ title });
    const saved = await this.tasksRepository.save(task);
    this.logger.debug(`New task title: "${title}"`);
    this.eventEmitter.emit(
      'task.created',
      new TaskCreatedEvent(saved.id, saved.title),
    );
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

  async update(id: number, changes: UpdateTaskDto) {
    const task = await this.findOne(id);
    // DTO fields that weren't sent are present as undefined; skip them
    const sent = Object.fromEntries(
      Object.entries(changes).filter(([, value]) => value !== undefined),
    );
    Object.assign(task, sent);
    const saved = await this.tasksRepository.save(task);
    this.eventEmitter.emit(
      'task.updated',
      new TaskUpdatedEvent(saved.id, saved.title, saved.done),
    );
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
