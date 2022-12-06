import { Module } from "@nestjs/common";
import { TodoListModule } from "./domain/todolist/todolist.module";
import { TRPCModule } from "./infrastructure/interfaces/trpc/trpcModule";

@Module({
  imports: [TRPCModule, TodoListModule],
})
export class ApplicationModule {}
