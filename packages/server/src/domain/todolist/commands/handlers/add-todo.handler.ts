import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../repository/todolist.repository";
import { AddTodoCommand } from "../impl/add-todo.command";

@CommandHandler(AddTodoCommand)
export class AddTodoHandler implements ICommandHandler<AddTodoCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: AddTodoCommand) {
    const todoList = this.publisher.mergeObjectContext(
      await this.repository.get(command.aggregateId)
    );
    todoList.addTodo(command.text);
    todoList.commit();
  }
}
