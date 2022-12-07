import { Todo } from "../todolist-types";

export class TodoAddedEvent {
  constructor(public readonly todo: Todo) {}
}
