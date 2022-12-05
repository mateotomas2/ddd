import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddTodoCommand } from './commands/impl/add-todo.command';
import { MarkDoneCommand } from './commands/impl/mark-done.command';
import { MarkUndoneCommand } from './commands/impl/mark-undone.command';
import { TodoList } from './models/todo-list.model';
import { GetTodoListQuery } from './queries/impl';

export class TodoListController {
  constructor(
    @Inject(CommandBus) private readonly commandBus: CommandBus,
    @Inject(QueryBus) private readonly queryBus: QueryBus,
  ) { }

  async addTodo(text: string) {
    return this.commandBus.execute(new AddTodoCommand(text));
  }

  async markDone(id: string) {
    return this.commandBus.execute(new MarkDoneCommand(id));
  }

  async markUndone(id: string) {
    return this.commandBus.execute(new MarkUndoneCommand(id));
  }

  async findAll(): Promise<TodoList[]> {
    return this.queryBus.execute(new GetTodoListQuery());
  }
}
