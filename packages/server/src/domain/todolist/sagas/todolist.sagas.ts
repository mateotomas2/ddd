/*import { TodoMarkedDone, TodoMarkedUndone } from "shared/src";
import { Injectable } from "@nestjs/common";
import { ofType, Saga } from "@nestjs/cqrs";
import { EMPTY, merge, Observable, of } from "rxjs";
import { delay, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { RemoveTodoCommand } from "../commands/impl/remove-todo.command";

@Injectable()
export class TodoListSagas {
  @Saga()
  todoRemoveAfterTenSeconds = (
    events$: Observable<TodoMarkedDone | TodoMarkedUndone>
  ): Observable<RemoveTodoCommand> => {
    // Wait for a todo to be marked done
    return merge(events$.pipe(ofType(TodoMarkedDone))).pipe(
      mergeMap((value) => {
        // For each one that is marked as done, wait for 10 seconds only if TodoMarkedUndone is not triggered before finishing
        return merge(
          of(value),
          events$.pipe(
            ofType(TodoMarkedUndone),
            filter((data) => data.id == value.id)
          )
        ).pipe(
          switchMap((value) => {
            if (value.constructor.name == "TodoMarkedUndone") {
              return EMPTY;
            }
            return of(value).pipe(delay(10000));
          })
        );
      }),
      map((event) => {
        return new RemoveTodoCommand(event.id);
      })
    );
  };
}*/
