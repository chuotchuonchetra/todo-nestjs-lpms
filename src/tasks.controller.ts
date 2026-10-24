import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get('welcome')
  getWelcome() {
    return {
      message: 'Welcome to MyTasks! Your task list starts here.',
    };
  }

  @Get('todo')
  findTodo() {
    return this.tasksService.findTodo();
  }

  @Get('done')
  findDone() {
    return this.tasksService.findDone();
  }

  @Get('agent')
  whoIsAsking(@UserAgent() agent: string) {
    return { userAgent: agent };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('done') done: boolean) {
    return this.tasksService.update(Number(id), done);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
