import {
  EventTypeMapped,
  Todo,
  todoListReducer,
  TodoListType,
} from "@monorepo/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { TodoList } from "../models/todo-list.model";
import { todoList } from "./fixtures/todo-list";

@Injectable()
export class TodoRepository {
  state: TodoListType = {
    todos: [],
  };

  eventList: EventTypeMapped[] = [];

  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {
    this.eventBus.subscribe((event: EventTypeMapped) => {
      this.eventList.push(event);
      this.state = todoListReducer({ ...this.state }, event);
    });
  }

  async get(): Promise<TodoList> {
    return todoList;
  }

  async findAll(): Promise<Todo[]> {
    return this.state.todos;
  }

  async getEvents(): Promise<EventTypeMapped[]> {
    return this.eventList;
  }
}
