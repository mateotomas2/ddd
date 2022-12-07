import { TodoAddedHandler } from "./todo-added.handler";
import { TodoMarkedDoneHandler } from "./todo-marked-done.handler";
import { TodoMarkedUndoneHandler } from "./todo-marked-undone.handler";
import { TodoRemovedHandler } from "./todo-removed.handler";

export const EventHandlers = [
  TodoAddedHandler,
  TodoMarkedDoneHandler,
  TodoMarkedUndoneHandler,
  TodoRemovedHandler,
];
