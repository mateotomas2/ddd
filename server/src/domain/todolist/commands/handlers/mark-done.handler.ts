import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../repository/todolist.repository";
import { MarkDoneCommand } from "../impl/mark-done.command";

@CommandHandler(MarkDoneCommand)
export class MarkDoneHandler implements ICommandHandler<MarkDoneCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: MarkDoneCommand) {
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.get()
    );
    todoList.markDone(command.id);
    todoList.commit();
  }
}
