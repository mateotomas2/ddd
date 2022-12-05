import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TodoAddedEvent } from '../events/impl/todo-added.event';


@Injectable()
export class TodoListSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<void> => {
    return events$
      .pipe(
        ofType(TodoAddedEvent),
        delay(1000),
        map(_event => {
          console.log('ADD TODO SAGA');
          //return new RemoveTodoCommand(event.id);
        }),
      );
  }
}
