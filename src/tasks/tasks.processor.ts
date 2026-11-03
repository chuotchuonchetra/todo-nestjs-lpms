import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export interface ReminderJobData {
  taskId: number;
  title: string;
}

@Processor('tasks')
export class TasksProcessor extends WorkerHost {
  private readonly logger = new Logger(TasksProcessor.name);

  async process(job: Job<ReminderJobData>) {
    if (job.name === 'send-reminder') {
      this.logger.log(
        `Reminder for task ${job.data.taskId}: "${job.data.title}" (attempt ${job.attemptsMade + 1})`,
      );
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<ReminderJobData>, error: Error) {
    this.logger.warn(
      `Job ${job.name} #${job.id} failed on attempt ${job.attemptsMade}: ${error.message}`,
    );
  }
}
