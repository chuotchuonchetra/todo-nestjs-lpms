import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskCreatedEvent } from './task-created.event.js';
import { TaskUpdatedEvent } from './task-updated.event.js';

@Injectable()
export class TaskStatsListener {
  private readonly logger = new Logger(TaskStatsListener.name);
  private createdCount = 0;
  // Ids of tasks marked done, so marking the same task twice counts once
  private readonly doneIds = new Set<number>();

  @OnEvent('task.created')
  handleTaskCreated(event: TaskCreatedEvent) {
    this.createdCount++;
    this.logger.log(
      `Tasks created since start: ${this.createdCount} (latest: ${event.id})`,
    );
  }

  @OnEvent('task.updated')
  handleTaskUpdated(event: TaskUpdatedEvent) {
    if (event.done) {
      this.doneIds.add(event.id);
    } else {
      this.doneIds.delete(event.id);
    }
    this.logger.log(`Tasks marked done since start: ${this.doneIds.size}`);
  }
}
