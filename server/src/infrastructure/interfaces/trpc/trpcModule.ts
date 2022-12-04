import { Module } from "@nestjs/common";
import { EventService } from "./events.service";
import { TRPCTodo } from "./todo/todo.router";
import { TRCPInitService } from "./trpc.init.service";
import { TRPCService } from "./trpcService";

@Module({
  providers: [
    TRCPInitService, EventService, TRPCTodo, TRPCService
],
})
export class TRPCModule {}
