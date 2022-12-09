import { useMatch } from "@tanstack/react-router";
import TodoListOffline from "../components/todolist/TodoList";
import { todoListRouter } from "../Layout";

export function TodoListPage() {
  const { params } = useMatch(todoListRouter.id);

  return (
    <div className="p-2 flex gap-2">
      <TodoListOffline />
    </div>
  );
}
