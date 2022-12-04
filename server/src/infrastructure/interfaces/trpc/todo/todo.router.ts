import { Inject, Injectable } from '@nestjs/common';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { EventService } from '../events.service';
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
    @Inject(EventService) private readonly events: EventService
  ) { }

  todoRouter = this.trpcInit.t.router({
    onAdd: this.trpcInit.t.procedure.subscription(() => {
      return observable<Todo>((emit) => {
        const onAdd = (data: Todo) => {
          emit.next(data);
        };
        this.events.eventEmitter.on('add', onAdd);
        return () => {
          this.events.eventEmitter.off('add', onAdd);
        };
      });
    }),
    add: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid().optional(),
          text: z.string().min(1),
          done: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };

        this.events.eventEmitter.emit('add', post);
        return post;
      }),
    onToggleDone: this.trpcInit.t.procedure.subscription(() => {
      return observable<Todo>((emit) => {
        const onToggleDone = (data: Todo) => {
          emit.next(data);
        };
        this.events.eventEmitter.on('toogleDone', onToggleDone);

        return () => {
          this.events.eventEmitter.off('toogleDone', onToggleDone);
        };
      });
    }),

    toggleDone: this.trpcInit.t.procedure
      .input(
        z.object({
          id: z.string().uuid(),
          done: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const post = { ...input };

        this.events.eventEmitter.emit('toogleDone', post);
        return post;
      }),
  });
}
