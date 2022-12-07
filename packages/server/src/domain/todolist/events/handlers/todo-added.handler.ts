import { TodoAddedEvent } from "@monorepo/shared";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoAddedEvent)
export class TodoAddedHandler implements IEventHandler<TodoAddedEvent> {
  handle(_event: TodoAddedEvent) {
    //console.log("Async TodoAddedEvent...");
  }
}
