import { EventTypeMapped } from "@monorepo/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { TodoListController } from "../../../../domain/todolist/todolist.controller";
import { TRCPInitService } from "../trpc.init.service";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};
// TODO: Move app router to shared so we can build safely the client
@Injectable()
export class TRPCTodo {
  constructor(
    @Inject(TRCPInitService) private readonly trpcInit: TRCPInitService,
    @Inject(TodoListController)
    private readonly todoListFeatures: TodoListController,
    @Inject(EventBus) private readonly eventBus: EventBus
  ) {}
  todoRouter = this.trpcInit.t.router({
    onEventReceived: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
        })
      )
      .subscription(({ input }) => {
        return observable<EventTypeMapped>((emit) => {
          const onEventReceived = (data: EventTypeMapped) => {
            if (data.aggregateId == input.aggregateId) {
              emit.next(data);
            }
          };

          const subscription = this.eventBus.subscribe(onEventReceived);

          return () => {
            subscription.unsubscribe();
          };
        });
      }),

    new: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.new(input.id, input.name);
        return post;
      }),

    add: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
          text: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.addTodo(input.aggregateId, input.text);
        return post;
      }),

    markDone: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
          id: z.string().uuid(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markDone(input.aggregateId, input.id);
        return post;
      }),

    markUndone: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
          id: z.string().uuid(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };
        this.todoListFeatures.markUndone(input.aggregateId, input.id);
        return post;
      }),

    onTodoListSnapshot: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
        })
      )
      .subscription(() => {
        return observable<Todo[]>((emit) => {
          // TODO: Implement snapshots
          /*this.todoListFeatures.getTodoList().then((todoList) => {
          emit.next(todoList);
        });*/
        });
      }),
    onTodoListEvents: this.trpcInit.t.procedure
      .input(
        z.object({
          aggregateId: z.string().uuid(),
        })
      )
      .subscription(({ input }) => {
        return observable<EventTypeMapped[]>((emit) => {
          emit.next([]);

          this.todoListFeatures
            .getTodoListEvents(input.aggregateId)
            .then((eventList) => {
              emit.next(eventList);
            });
        });
      }),
  });
}
