import { createEvent } from "@monorepo/shared";
import { AggregateRoot } from "@nestjs/cqrs";
import { v4 } from "uuid";

export class TodoList extends AggregateRoot {
  constructor() {
    super();
  }

  addTodo(text: string) {
    this.apply(
      createEvent("TodoAdded", {
        id: v4(),
        text,
        done: false,
      })
    );
  }

  removeTodo(id: string) {
    this.apply(
      createEvent("Removed", {
        id: id,
      })
    );
  }

  markDone(id: string) {
    this.apply(
      createEvent("MarkedDone", {
        id: id,
      })
    );
  }

  markUndone(id: string) {
    this.apply(
      createEvent("MarkedUndone", {
        id: id,
      })
    );
  }
}
