import { Event } from "../../core/event";

export class TodoMarkedDone extends Event {
  constructor(public readonly id: string) {
    super();
  }
}
