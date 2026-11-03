import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bullmq';
import { TaskCreatedEvent } from './task-created.event.js';
import { TaskUpdatedEvent } from './task-updated.event.js';
import type { ReminderJobData } from './tasks.processor.js';

// 5 seconds while testing; a real reminder would be hours or days
const REMINDER_DELAY_MS = 5_000;

@Injectable()
export class TaskNotificationsListener {
  private readonly logger = new Logger(TaskNotificationsListener.name);

  constructor(@InjectQueue('tasks') private readonly tasksQueue: Queue) {}

  @OnEvent('task.created')
  async handleTaskCreated(event: TaskCreatedEvent) {
    this.logger.log(`Task ${event.id} created: "${event.title}"`);

    const data: ReminderJobData = { taskId: event.id, title: event.title };
    await this.tasksQueue.add('send-reminder', data, {
      delay: REMINDER_DELAY_MS,
      attempts: 3,
      backoff: { type: 'fixed', delay: 2_000 },
    });
    this.logger.log(`Reminder for task ${event.id} queued`);
  }

  @OnEvent('task.updated')
  handleTaskUpdated(event: TaskUpdatedEvent) {
    this.logger.log(
      `Task ${event.id} updated: "${event.title}", done: ${event.done}`,
    );
  }
}
