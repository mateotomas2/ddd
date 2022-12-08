import { EventTypeMapped } from "./events";
import { TodoListType } from "./todolist-types";

export const todoListReducer = (
  state: TodoListType,
  event: EventTypeMapped
) => {
  switch (event.type) {
    case "TodoAdded":
      state.todos = [...state.todos, event.payload];
      break;
    case "Removed":
      state.todos = [
        ...state.todos.filter((todo) => todo.id !== event.payload.id),
      ];
      break;
    case "MarkedDone":
      state.todos = state.todos.map((todo) =>
        todo.id == event.payload.id ? { ...todo, done: true } : todo
      );
      break;
    case "MarkedUndone":
      state.todos = state.todos.map((todo) =>
        todo.id == event.payload.id ? { ...todo, done: false } : todo
      );
      break;
  }
  return state;
};
