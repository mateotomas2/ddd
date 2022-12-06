import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { TodoListController } from "./todolist.controller";
import { QueryHandlers } from "./queries/handlers";
import { TodoRepository } from "./repository/todolist.repository";
import { TodoListSagas } from "./sagas/todolist.sagas";

@Module({
  imports: [CqrsModule],
  providers: [
    TodoRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    TodoListController,
    TodoListSagas,
  ],
  exports: [TodoListController],
})
export class TodoListModule {}
