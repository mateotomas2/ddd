import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoRepository } from "../../repository/todolist.repository";
import { NewTodoListCommand } from "../impl/new-todo-list.command";

@CommandHandler(NewTodoListCommand)
export class NewTodoListHandler implements ICommandHandler<NewTodoListCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository,
    @Inject(EventPublisher) private readonly publisher: EventPublisher
  ) {}

  async execute(command: NewTodoListCommand) {
    // TODO: Should use the aggregate
    const todoList = this.repository.new(command.id, command.name);
    /*console.log("NewTodoListCommand");
    console.log(todoList);*/
    /*const todoList = this.publisher.mergeObjectContext(
      await this.repository.get()
    );
    todoList.new(command.text);
    todoList.commit();*/
  }
}
