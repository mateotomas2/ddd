export class MarkUndoneCommand {
  constructor(
    public readonly aggregateId: string,
    public readonly id: string
  ) {}
}
