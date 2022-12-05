import { Inject, Injectable } from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { observable } from '@trpc/server/observable';
import { filter, map } from 'rxjs';
import { z } from 'zod';
import { TodoAddedEvent } from '../../../../domain/todolist/events/impl/todo-added.event';
import { TodoMarkedDone } from '../../../../domain/todolist/events/impl/todo-marked-done.event';
import { TodoMarkedUndone } from '../../../../domain/todolist/events/impl/todo-marked-undone.event';
import { TodoRemovedEvent } from '../../../../domain/todolist/events/impl/todo-removed.event';
import { TodoListController } from '../../../../domain/todolist/todolist.controller';
import { TRCPInitService } from '../trpc.init.service';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

@Injectable()
export class TRPCTodo {
  constructor(
    @Inject(TRCPInitService) private readonly trpcInit: TRCPInitService,
    @Inject(TodoListController) private readonly todoListFeatures: TodoListController,
    @Inject(EventBus) private readonly eventBus: EventBus
  ) {
  }
  subscribeToEvent = <T extends IEvent>(eventBus: EventBus, type: new (T) => T) => {
    return eventBus.pipe(filter((event) => (event as IEvent).constructor.name == type.name),
      map((event) => event as T)
    )
  }

  todoRouter = this.trpcInit.t.router({
    onAdd: this.trpcInit.t.procedure.subscription(() => {
      return observable<TodoAddedEvent>((emit) => {
        const onAdd = (data: TodoAddedEvent) => {
          emit.next(data);
        };

        const subscription = this.subscribeToEvent(this.eventBus, TodoAddedEvent).subscribe(onAdd)

        return () => {
          subscription.unsubscribe();
        };
      });
    }),
    add: this.trpcInit.t.procedure
      .input(
        z.object({
          text: z.string().min(1)
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.addTodo(input.text);
        return post;
      }),

    onRemove: this.trpcInit.t.procedure.subscription(() => {
      return observable<TodoRemovedEvent>((emit) => {
        const onMarkDone = (data: TodoRemovedEvent) => {
          emit.next(data);
        };

        const subscription = this.subscribeToEvent(this.eventBus, TodoRemovedEvent).subscribe(onMarkDone)

        return () => {
          subscription.unsubscribe();
        };
      });
    }),

    onMarkDone: this.trpcInit.t.procedure.subscription(() => {
      return observable<TodoMarkedDone>((emit) => {
        const onMarkDone = (data: TodoMarkedDone) => {
          emit.next(data);
        };
        const subscription = this.subscribeToEvent(this.eventBus, TodoMarkedDone).subscribe(onMarkDone)
        return () => {
          subscription.unsubscribe();
        };
      });
    }),

    markDone: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid()
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markDone(input.id);
        return post;
      }),

    onMarkUndone: this.trpcInit.t.procedure.subscription(() => {
      return observable<TodoMarkedUndone>((emit) => {
        const onMarkDone = (data: TodoMarkedUndone) => {
          emit.next(data);
        };

        const subscription = this.subscribeToEvent(this.eventBus, TodoMarkedUndone).subscribe(onMarkDone)

        return () => {
          subscription.unsubscribe();
        };
      });
    }),

    markUndone: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid()
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markUndone(input.id);
        return post;
      }),

    onTodoListInit: this.trpcInit.t.procedure.subscription(() => {
      return observable<Todo[]>((emit) => {
        this.todoListFeatures.getTodoList().then((todoList) => {
          emit.next(todoList);
        });
      });
    }),
  });
}
