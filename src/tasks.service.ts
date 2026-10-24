import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly tasks = [
    { id: 1, title: 'Install Node.js and VS Code', done: true },
    { id: 2, title: 'Create the mytasks Nest project', done: true },
    { id: 3, title: 'Build the TasksController', done: true },
    { id: 4, title: 'Finish the bootcamp assignment', done: false },
    { id: 5, title: 'Push the project to GitHub', done: false },
  ];

  private nextId = 6;

  create(title: string) {
    const task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findTodo() {
    return this.tasks.filter((task) => task.done === false);
  }

  findDone() {
    return this.tasks.filter((task) => task.done === true);
  }

  findOne(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, done: boolean) {
    const task = this.findOne(id);
    if (task) {
      task.done = done;
    }
    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return undefined;
    }
    const [removed] = this.tasks.splice(index, 1);
    return {
      message: `Task ${removed.id} removed successfully`,
    };
  }
}
