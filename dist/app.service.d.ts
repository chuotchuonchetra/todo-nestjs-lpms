export declare class AppService {
    getHello(): string;
    getWelcome(name: string): {
        message: string;
        taskCount: number;
        tasks: string[];
        serverTime: string;
    };
}
