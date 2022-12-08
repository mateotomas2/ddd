import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import * as clc from "cli-color";
import { TodoRepository } from "../../repository/todolist.repository";
import { GetTodoListQuery } from "../impl";

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler implements IQueryHandler<GetTodoListQuery> {
  constructor(
    @Inject(TodoRepository) private readonly repository: TodoRepository
  ) {}

  async execute(query: GetTodoListQuery) {
    return this.repository.findAll(query.aggregateId);
  }
}
