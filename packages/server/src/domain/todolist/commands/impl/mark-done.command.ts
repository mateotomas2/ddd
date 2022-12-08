export class MarkDoneCommand {
  constructor(
    public readonly aggregateId: string,
    public readonly id: string
  ) {}
}
