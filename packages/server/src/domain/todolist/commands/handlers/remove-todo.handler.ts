import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../repository/todolist.repository";
import { RemoveTodoCommand } from "../impl/remove-todo.command";

@CommandHandler(RemoveTodoCommand)
export class RemoveTodoHandler implements ICommandHandler<RemoveTodoCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveTodoCommand) {
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.get(command.aggregateId)
    );
    todoList.removeTodo(command.id);
    todoList.commit();
  }
}
