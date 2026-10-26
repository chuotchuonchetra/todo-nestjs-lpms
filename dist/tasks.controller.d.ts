import { TasksService } from './tasks.service.js';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<{
        id: number;
        title: string;
        done: boolean;
    }[]>;
    create(title: string): Promise<{
        id: number;
        title: string;
        done: boolean;
    }>;
    getWelcome(): {
        message: string;
    };
    findTodo(): {
        id: number;
        title: string;
        done: boolean;
    }[];
    findDone(): {
        id: number;
        title: string;
        done: boolean;
    }[];
    whoIsAsking(agent: string): {
        userAgent: string;
    };
    getOneTask(id: number): Promise<{
        id: number;
        title: string;
        done: boolean;
    } | undefined>;
    update(id: string, done: boolean): Promise<{
        id: number;
        title: string;
        done: boolean;
    } | undefined>;
    remove(id: string): Promise<{
        message: string;
    } | undefined>;
}
