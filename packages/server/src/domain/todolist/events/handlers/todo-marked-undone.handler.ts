import { TodoMarkedUndone } from "@monorepo/shared";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(TodoMarkedUndone)
export class TodoMarkedUndoneHandler
  implements IEventHandler<TodoMarkedUndone>
{
  handle(_event: TodoMarkedUndone) {
    //console.log("Async TodoMarkedUndone...");
  }
}
