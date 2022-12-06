import { TodoMarkedDone } from "@monorepo/shared";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoMarkedDone)
export class TodoMarkedDoneHandler implements IEventHandler<TodoMarkedDone> {
  handle(_event: TodoMarkedDone) {
    //console.log("Async TodoMarkedDone...");
  }
}
