export declare class TasksController {
    private readonly tasks;
    findAll(): {
        id: number;
        title: string;
        done: boolean;
    }[];
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
}
