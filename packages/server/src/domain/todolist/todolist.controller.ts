import { EventTypeMapped, Todo } from "@monorepo/shared";
import { Inject } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddTodoCommand } from "./commands/impl/add-todo.command";
import { DeleteTodoCommand } from "./commands/impl/delete-todo.command";
import { MarkDoneCommand } from "./commands/impl/mark-done.command";
import { MarkUndoneCommand } from "./commands/impl/mark-undone.command";
import { NewTodoListCommand } from "./commands/impl/new-todo-list.command";
import { GetTodoListEventsQuery, GetTodoListQuery } from "./queries/impl";

export class TodoListController {
  constructor(
    @Inject(CommandBus) private readonly commandBus: CommandBus,
    @Inject(QueryBus) private readonly queryBus: QueryBus
  ) {}

  async new(id: string, name: string) {
    return this.commandBus.execute(new NewTodoListCommand(id, name));
  }

  async deleteTodo(aggregateId: string, id: string) {
    return this.commandBus.execute(new DeleteTodoCommand(aggregateId, id));
  }

  async addTodo(aggregateId: string, text: string) {
    return this.commandBus.execute(new AddTodoCommand(aggregateId, text));
  }

  async markDone(aggregateId: string, id: string) {
    return this.commandBus.execute(new MarkDoneCommand(aggregateId, id));
  }

  async markUndone(aggregateId: string, id: string) {
    return this.commandBus.execute(new MarkUndoneCommand(aggregateId, id));
  }

  async getTodoList(aggregateId: string): Promise<Todo[]> {
    return this.queryBus.execute(new GetTodoListQuery(aggregateId));
  }

  async getTodoListEvents(aggregateId: string): Promise<EventTypeMapped[]> {
    return this.queryBus.execute(new GetTodoListEventsQuery(aggregateId));
  }
}
