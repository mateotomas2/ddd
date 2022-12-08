import { createEvent } from "@monorepo/shared";
import { AggregateRoot } from "@nestjs/cqrs";
import { v4 } from "uuid";

export class TodoList extends AggregateRoot {
  constructor(public readonly id: string) {
    super();
  }

  new(id: string, name: string) {
    this.apply(
      createEvent(id, "TodoListCreated", {
        id,
        name,
      })
    );
  }

  addTodo(text: string) {
    this.apply(
      createEvent(this.id, "TodoAdded", {
        id: v4(),
        text,
        done: false,
      })
    );
  }

  removeTodo(id: string) {
    this.apply(
      createEvent(this.id, "Removed", {
        id: id,
      })
    );
  }

  markDone(id: string) {
    this.apply(
      createEvent(this.id, "MarkedDone", {
        id: id,
      })
    );
  }

  markUndone(id: string) {
    this.apply(
      createEvent(this.id, "MarkedUndone", {
        id: id,
      })
    );
  }
}
