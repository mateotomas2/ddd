import { AggregateRoot } from "@nestjs/cqrs";
import { TodoAddedEvent } from "../events/impl/todo-added.event";
import { TodoMarkedDone } from "../events/impl/todo-marked-done.event";
import { v4 } from "uuid";
import { TodoMarkedUndone } from "../events/impl/todo-marked-undone.event";
import { TodoRemovedEvent } from "../events/impl/todo-removed.event";

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
