import { Logger, Module } from "@nestjs/common";
import { TodoListModule } from "./domain/todolist/todolist.module";
import { TRPCModule } from "./infrastructure/interfaces/trpc/trpcModule";

@Module({
  imports: [TRPCModule, TodoListModule, Logger],
})
export class ApplicationModule {}
