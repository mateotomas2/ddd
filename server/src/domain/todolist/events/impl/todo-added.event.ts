import { Todo } from "../../../../infrastructure/interfaces/trpc/todo/todo.router";

export class TodoAddedEvent {
  constructor(
    public readonly todo: Todo) { }
}

