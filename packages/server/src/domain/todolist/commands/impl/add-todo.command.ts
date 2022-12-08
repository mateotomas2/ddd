export class AddTodoCommand {
  constructor(
    public readonly aggregateId: string,
    public readonly text: string
  ) {}
}
