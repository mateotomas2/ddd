import { Event } from "../../core/event";

export class TodoMarkedUndone extends Event {
  constructor(public readonly id: string) {
    super();
  }
}
