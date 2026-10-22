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
}
