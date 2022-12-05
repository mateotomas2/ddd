import { Injectable } from '@nestjs/common';
import { TodoList } from '../models/todo-list.model';
import { todoList } from './fixtures/todo-list';


@Injectable()
export class TodoRepository {
  //state: TodoList = [];

  async get(): Promise<TodoList> {
    return todoList;
  }

}
