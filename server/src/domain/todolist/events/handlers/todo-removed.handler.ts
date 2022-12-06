import { TodoRemovedEvent } from "@monorepo/shared";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoRemovedEvent)
export class TodoRemovedHandler implements IEventHandler<TodoRemovedEvent> {
  handle(_event: TodoRemovedEvent) {
    //console.log("Async TodoRemoved...");
  }
}
