import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../repository/todolist.repository";
import { DeleteTodoCommand } from "../impl/delete-todo.command";

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteTodoCommand) {
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.get(command.aggregateId)
    );
    todoList.removeTodo(command.id);
    todoList.commit();
  }
}
