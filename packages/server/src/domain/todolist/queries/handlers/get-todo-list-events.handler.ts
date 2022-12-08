import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { TodoRepository } from "../../repository/todolist.repository";
import { GetTodoListEventsQuery } from "../impl";

@QueryHandler(GetTodoListEventsQuery)
export class GetTodoListEventsHandler
  implements IQueryHandler<GetTodoListEventsQuery>
{
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository
  ) {}

  async execute(_query: GetTodoListEventsQuery) {
    return this.repository.getEvents();
  }
}
