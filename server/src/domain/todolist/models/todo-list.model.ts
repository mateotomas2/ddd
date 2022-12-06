import {
  TodoAddedEvent,
  TodoMarkedDone,
  TodoMarkedUndone,
  TodoRemovedEvent,
} from "@monorepo/shared";
import { AggregateRoot } from "@nestjs/cqrs";
import { v4 } from "uuid";

export class TodoList extends AggregateRoot {
  constructor() {
    super();
  }

  addTodo(text: string) {
    this.apply(
      new TodoAddedEvent({
        id: v4(),
        text,
        done: false,
      })
    );
  }

  removeTodo(id: string) {
    this.apply(new TodoRemovedEvent(id));
  }

  markDone(id: string) {
    this.apply(new TodoMarkedDone(id));
  }

  markUndone(id: string) {
    this.apply(new TodoMarkedUndone(id));
  }
}
