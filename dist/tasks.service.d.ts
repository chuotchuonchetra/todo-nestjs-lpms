export declare class TasksService {
    private readonly tasks;
    private nextId;
    create(title: string): Promise<{
        id: number;
        title: string;
        done: boolean;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        done: boolean;
    }[]>;
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
    findOne(id: number): Promise<{
        id: number;
        title: string;
        done: boolean;
    } | undefined>;
    update(id: number, done: boolean): Promise<{
        id: number;
        title: string;
        done: boolean;
    } | undefined>;
    remove(id: number): Promise<{
        message: string;
    } | undefined>;
}
