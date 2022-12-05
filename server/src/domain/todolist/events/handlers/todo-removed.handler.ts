import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoRemovedEvent } from '../impl/todo-removed.event';

@EventsHandler(TodoRemovedEvent)
export class TodoRemovedHandler implements IEventHandler<TodoRemovedEvent> {
  handle(_event: TodoRemovedEvent) {
    console.log('Async TodoRemoved...');
  }
}
