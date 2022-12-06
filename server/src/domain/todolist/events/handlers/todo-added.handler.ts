import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoAddedEvent } from "../impl/todo-added.event";

@EventsHandler(TodoAddedEvent)
export class TodoAddedHandler implements IEventHandler<TodoAddedEvent> {
  handle(_event: TodoAddedEvent) {
    console.log("Async TodoAddedEvent...");
  }
}
