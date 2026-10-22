import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
        taskCount: number;
        tasks: string[];
        serverTime: string;
    };
}
