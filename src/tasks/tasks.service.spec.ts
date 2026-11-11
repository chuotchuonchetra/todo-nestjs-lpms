import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../task.entity.js';
import { TasksService } from '../tasks.service.js';
import { TaskCreatedEvent } from './task-created.event.js';

describe('TasksService', () => {
  let service: TasksService;

  // Fake repository and emitter: no real database or Redis is touched
  const repository = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
  };
  const eventEmitter = { emit: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: repository },
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();

    service = moduleRef.get(TasksService);
  });

  it('findAll returns the tasks from the repository', async () => {
    const tasks = [{ id: 1, title: 'Buy milk', done: false }];
    repository.find.mockResolvedValue(tasks);

    await expect(service.findAll()).resolves.toEqual(tasks);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('findOne throws NotFoundException when the task does not exist', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('create saves the task and emits task.created', async () => {
    const task = { id: 5, title: 'Buy milk', done: false };
    repository.create.mockReturnValue(task);
    repository.save.mockResolvedValue(task);

    await expect(service.create('Buy milk')).resolves.toEqual(task);
    expect(repository.save).toHaveBeenCalledWith(task);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'task.created',
      new TaskCreatedEvent(5, 'Buy milk'),
    );
  });

  it('update throws NotFoundException when the task does not exist', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.update(999, { done: true })).rejects.toThrow(
      NotFoundException,
    );
    expect(repository.save).not.toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
