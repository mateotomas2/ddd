import { EventTypeMapped } from "@monorepo/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus, IEvent } from "@nestjs/cqrs";
import { observable } from "@trpc/server/observable";
import { filter, map } from "rxjs";
import { z } from "zod";
import { TodoListController } from "../../../../domain/todolist/todolist.controller";
import { TRCPInitService } from "../trpc.init.service";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

@Injectable()
export class TRPCTodo {
  constructor(
    @Inject(TRCPInitService) private readonly trpcInit: TRCPInitService,
    @Inject(TodoListController)
    private readonly todoListFeatures: TodoListController,
    @Inject(EventBus) private readonly eventBus: EventBus
  ) {}
  subscribeToEvent = <T extends IEvent>(
    eventBus: EventBus,
    type: new (T) => T
  ) => {
    return eventBus.pipe(
      filter((event) => (event as IEvent).constructor.name == type.name),
      map((event) => event as T)
    );
  };

  todoRouter = this.trpcInit.t.router({
    onEventReceived: this.trpcInit.t.procedure.subscription(() => {
      return observable<EventTypeMapped>((emit) => {
        const onEventReceived = (data: EventTypeMapped) => {
          emit.next(data);
        };

        const subscription = this.eventBus.subscribe(onEventReceived);

        return () => {
          subscription.unsubscribe();
        };
      });
    }),

    add: this.trpcInit.t.procedure
      .input(
        z.object({
          text: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.addTodo(input.text);
        return post;
      }),

    markDone: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markDone(input.id);
        return post;
      }),

    markUndone: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markUndone(input.id);
        return post;
      }),

    onTodoListSnapshot: this.trpcInit.t.procedure.subscription(() => {
      return observable<Todo[]>((emit) => {
        /*this.todoListFeatures.getTodoList().then((todoList) => {
          emit.next(todoList);
        });*/
      });
    }),
    onTodoListEvents: this.trpcInit.t.procedure.subscription(() => {
      return observable<EventTypeMapped[]>((emit) => {
        this.todoListFeatures.getTodoListEvents().then((eventList) => {
          emit.next(eventList);
        });
      });
    }),
  });
}
