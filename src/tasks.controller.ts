import { Controller, Get, Param } from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';

@Controller('tasks')
export class TasksController {
  private readonly tasks = [
    { id: 1, title: 'Install Node.js and VS Code', done: true },
    { id: 2, title: 'Create the mytasks Nest project', done: true },
    { id: 3, title: 'Build the TasksController', done: true },
    { id: 4, title: 'Finish the bootcamp assignment', done: false },
    { id: 5, title: 'Push the project to GitHub', done: false },
  ];

  @Get()
  findAll() {
    return this.tasks;
  }

  @Get('welcome')
  getWelcome() {
    return {
      message: 'Welcome to MyTasks! Your task list starts here.',
    };
  }

  @Get('todo')
  findTodo() {
    return this.tasks.filter((task) => task.done === false);
  }

  @Get('done')
  findDone() {
    return this.tasks.filter((task) => task.done === true);
  }

  @Get('agent')
  whoIsAsking(@UserAgent() agent: string) {
    return { userAgent: agent };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasks.find((task) => task.id === Number(id));
  }
}
