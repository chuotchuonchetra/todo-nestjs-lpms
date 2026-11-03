export class TaskCreatedEvent {
  constructor(
    public readonly id: number,
    public readonly title: string,
  ) {}
}
