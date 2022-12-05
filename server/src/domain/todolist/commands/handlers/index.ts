import { AddTodoHandler } from './add-todo.handler';
import { MarkDoneHandler } from './mark-done.handler';
import { MarkUndoneHandler } from './mark-undone.handler';
import { RemoveTodoHandler } from './remove-todo.handler';

export const CommandHandlers = [AddTodoHandler, MarkDoneHandler, MarkUndoneHandler, RemoveTodoHandler];
