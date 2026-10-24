import { TasksService } from './tasks.service.js';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): {
        id: number;
        title: string;
        done: boolean;
    }[];
    create(title: string): {
        id: number;
        title: string;
        done: boolean;
    };
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
    findOne(id: string): {
        id: number;
        title: string;
        done: boolean;
    } | undefined;
    update(id: string, done: boolean): {
        id: number;
        title: string;
        done: boolean;
    } | undefined;
    remove(id: string): {
        message: string;
    } | undefined;
}
