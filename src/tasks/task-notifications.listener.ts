import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from './task-created.event.js';
import { TaskUpdatedEvent } from './task-updated.event.js';

@Injectable()
export class TaskNotificationsListener {
  private readonly logger = new Logger(TaskNotificationsListener.name);

  @OnEvent('task.created')
  handleTaskCreated(event: TaskCreatedEvent) {
    this.logger.log(`Task ${event.id} created: "${event.title}"`);
  }

  @OnEvent('task.updated')
  handleTaskUpdated(event: TaskUpdatedEvent) {
    this.logger.log(
      `Task ${event.id} updated: "${event.title}", done: ${event.done}`,
    );
  }
}
