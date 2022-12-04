import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { Todo } from '../../../server/src/infrastructure/interfaces/trpc/todo/todo.router';

export default function useTodo() {
  const { mutate, error } = trpc.todo.add.useMutation();
  const { mutate: mutateToggleDone } = trpc.todo.toggleDone.useMutation();

  const [todos, setTodos] = useState<Array<Todo>>([]);

  trpc.todo.onAdd.useSubscription(undefined, {
    onData(todo) {
      setTodos((todos) => [...todos, todo]);
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error('Subscription error:', err);
    },
  });

  trpc.todo.onToggleDone.useSubscription(undefined, {
    onData(input) {
      setTodos((todos) => todos.map((todo) => todo.id == input.id ? { ...todo, done: input.done } : todo));
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error('Subscription error:', err);
    },
  });

  const addTodo = (todo: Todo) => {
    mutate(todo);
  };

  const toogleDone = (input) => {
    mutateToggleDone(input);
  };

  return {
    todos,
    addTodo,
    toogleDone,
    error,
  };
}
