import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoMarkedUndone } from "../impl/todo-marked-undone.event";

@EventsHandler(TodoMarkedUndone)
export class TodoMarkedUndoneHandler
  implements IEventHandler<TodoMarkedUndone>
{
  handle(_event: TodoMarkedUndone) {
    console.log("Async TodoMarkedUndone...");
  }
}
