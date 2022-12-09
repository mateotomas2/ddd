export class DeleteTodoCommand {
  constructor(
    public readonly aggregateId: string,
    public readonly id: string
  ) {}
}
