import { Event } from "../../core/event";

export class TodoRemovedEvent extends Event {
  constructor(public readonly id: string) {
    super();
  }
}
