import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { EMPTY, merge, Observable, of } from 'rxjs';
import { delay, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RemoveTodoCommand } from '../commands/impl/remove-todo.command';
import { TodoMarkedDone } from '../events/impl/todo-marked-done.event';
import { TodoMarkedUndone } from '../events/impl/todo-marked-undone.event';

@Injectable()
export class TodoListSagas {
  @Saga()
  todoRemoveAfterTenSeconds = (events$: Observable<any>): Observable<RemoveTodoCommand> => {
    // Wait for a todo to be marked done
    return merge(
      events$.pipe(ofType(TodoMarkedDone))
    ).pipe(
      mergeMap((value) => {
        // For each one that is marked as done, wait for 10 seconds only if TodoMarkedUndone is not triggered before finishing
        return merge(
          of(value),
          events$.pipe(ofType(TodoMarkedUndone), filter((data) => data.id == value.id))
        ).pipe(switchMap(value => {
          if (value.constructor.name == "TodoMarkedUndone") {
            return EMPTY;
          }
          return of(value).pipe(delay(10000))
        })
        );
      }),
      map(event => {
        return new RemoveTodoCommand(event.id);
      }),
    );
  }
}
