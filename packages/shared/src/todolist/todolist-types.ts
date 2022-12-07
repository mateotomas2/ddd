export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type TodoListType = {
  todos: Todo[];
};
