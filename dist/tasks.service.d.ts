export declare class TasksService {
    private readonly tasks;
    private nextId;
    create(title: string): {
        id: number;
        title: string;
        done: boolean;
    };
    findAll(): {
        id: number;
        title: string;
        done: boolean;
    }[];
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
    findOne(id: number): {
        id: number;
        title: string;
        done: boolean;
    } | undefined;
    update(id: number, done: boolean): {
        id: number;
        title: string;
        done: boolean;
    } | undefined;
    remove(id: number): {
        message: string;
    } | undefined;
}
