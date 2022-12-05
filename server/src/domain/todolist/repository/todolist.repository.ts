import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { TodoAddedEvent } from '../events/impl/todo-added.event';
import { TodoList } from '../models/todo-list.model';
import { todoList } from './fixtures/todo-list';

type Todo = {
  id: string;
  text: string;
  done: boolean;
}

type TodoListType = {
  todos: Todo[]
}

@Injectable()
export class TodoRepository {
  state: TodoListType = {
    todos: []
  };

  constructor(@Inject(EventBus) private readonly eventBus: EventBus
  ) {
    this.eventBus.subscribe((event) => {
      this.reduce(event);
    });
  }

  async get(): Promise<TodoList> {
    return todoList;
  }

  async findAll(): Promise<Todo[]> {
    return this.state.todos;
  }


  reduce = (event) => {
    switch (event.constructor.name) {
      case "TodoAddedEvent":
        this.state.todos = [...this.state.todos, event.todo]
        break;
      case "TodoRemovedEvent":
        this.state.todos = [...this.state.todos.filter((todo) => todo.id !== event.id)]
        break;
      case "TodoMarkedDone":
        this.state.todos = this.state.todos.map((todo) => todo.id == event.id ? { ...todo, done: true } : todo)
        break;
      case "TodoMarkedUndone":
        this.state.todos = this.state.todos.map((todo) => todo.id == event.id ? { ...todo, done: false } : todo)
        break;
    }
  }
}
