import {
  EventTypeMapped,
  Todo,
  todoListReducer,
  TodoListType,
} from "@monorepo/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { TodoList } from "../models/todo-list.model";

@Injectable()
export class TodoRepository {
  state: Record<string, TodoListType> = {};

  eventList: Record<string, EventTypeMapped[]> = {};

  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {
    this.eventBus.subscribe((event: EventTypeMapped) => {
      console.log("this.eventBus.subscribe");
      console.log(event);
      if (!this.eventList[event.aggregateId]) {
        this.eventList[event.aggregateId] = [];
      }
      this.eventList[event.aggregateId].push(event);

      if (!this.state[event.aggregateId]) {
        // TODO: This should not be needed
        this.state[event.aggregateId] = {
          id: event.aggregateId,
          name: "s",
          todos: [],
        };
      }

      this.state[event.aggregateId] = todoListReducer(
        { ...this.state[event.aggregateId] },
        event
      );
    });
  }

  async new(id: string, name: string): Promise<TodoList> {
    this.state[id] = {
      id: id,
      name: name,
      todos: [],
    };
    return new TodoList(id);
  }

  async get(aggregateId: string): Promise<TodoList> {
    return new TodoList(aggregateId);
  }

  async findAll(aggregateId: string): Promise<Todo[]> {
    return this.state[aggregateId].todos;
  }

  async getEvents(aggregateId: string): Promise<EventTypeMapped[]> {
    if (!this.eventList[aggregateId]) {
      this.eventList[aggregateId] = [];
    }
    return this.eventList[aggregateId];
  }
}
