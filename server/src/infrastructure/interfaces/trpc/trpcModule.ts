import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TodoListModule } from "../../../domain/todolist/todolist.module";
import { EventsModule } from "../../events/eventsModule";
import { TRPCTodo } from "./todo/todo.router";
import { TRCPInitService } from "./trpc.init.service";
import { TRPCService } from "./trpcService";

@Module({
  imports: [CqrsModule, EventsModule, TodoListModule],
  providers: [
    TRCPInitService, TRPCTodo, TRPCService
  ],
})
export class TRPCModule { }
