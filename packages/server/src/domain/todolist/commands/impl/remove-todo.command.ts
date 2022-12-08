export class RemoveTodoCommand {
  constructor(
    public readonly aggregateId: string,
    public readonly id: string
  ) {}
}
