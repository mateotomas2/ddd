export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type TodoListType = {
  id: string;
  name: string;
  todos: Todo[];
};
