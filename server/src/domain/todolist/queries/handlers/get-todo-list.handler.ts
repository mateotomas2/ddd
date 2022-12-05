import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetTodoListQuery } from '../impl';

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler implements IQueryHandler<GetTodoListQuery> {
  constructor() { }

  async execute(_query: GetTodoListQuery) {
    console.log(clc.yellowBright('Async GetTodoList...'));
    await new Promise(resolve => setTimeout(resolve, 3000));
    //return this.repository.findAll();
  }
}
