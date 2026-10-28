import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';
import { CreateTaskDto } from './tasks/dto/create-task.dto.js';
import { UpdateTaskDto } from './tasks/dto/update-task.dto.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto.title);
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

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const task = await this.tasksService.findOne(Number(id));
  //   return task;
  // }

  @Get(':id')
  async getOneTask(@Param('id', ParseIntPipe) id: number) {
    const taskPromise = await this.tasksService.findOne(id);

    console.log(taskPromise);

    return taskPromise;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto.done);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
