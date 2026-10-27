import { Repository } from 'typeorm';
import { Task } from './task.entity.js';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create(title: string): Promise<Task>;
    findAll(): Promise<Task[]>;
    findTodo(): Promise<Task[]>;
    findDone(): Promise<Task[]>;
    findOne(id: number): Promise<Task | undefined>;
    update(id: number, done: boolean): Promise<Task | undefined>;
    remove(id: number): Promise<{
        message: string;
    } | undefined>;
}
