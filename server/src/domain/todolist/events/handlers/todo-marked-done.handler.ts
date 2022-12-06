import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TodoMarkedDone } from "../impl/todo-marked-done.event";

@EventsHandler(TodoMarkedDone)
export class TodoMarkedDoneHandler implements IEventHandler<TodoMarkedDone> {
  handle(_event: TodoMarkedDone) {
    console.log("Async TodoMarkedDone...");
  }
}
