import { TasksService } from './tasks.service.js';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<import("./task.entity.js").Task[]>;
    create(title: string): Promise<import("./task.entity.js").Task>;
    getWelcome(): {
        message: string;
    };
    findTodo(): Promise<import("./task.entity.js").Task[]>;
    findDone(): Promise<import("./task.entity.js").Task[]>;
    whoIsAsking(agent: string): {
        userAgent: string;
    };
    getOneTask(id: number): Promise<import("./task.entity.js").Task | undefined>;
    update(id: string, done: boolean): Promise<import("./task.entity.js").Task | undefined>;
    remove(id: string): Promise<{
        message: string;
    } | undefined>;
}
