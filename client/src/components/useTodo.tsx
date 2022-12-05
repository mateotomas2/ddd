import { RouterInput, trpc } from '../utils/trpc';
import { useState } from 'react';
import { Todo } from '../../../server/src/infrastructure/interfaces/trpc/todo/todo.router';
import { inferRouterInputs } from '@trpc/server';

export default function useTodo() {
  const { mutate: mutateAddTodo, error } = trpc.todo.add.useMutation();
  const { mutate: mutateMarkDone } = trpc.todo.markDone.useMutation();
  const { mutate: mutateMarkUndone } = trpc.todo.markUndone.useMutation();

  const [todos, setTodos] = useState<Array<Todo>>([]);

  trpc.todo.onAdd.useSubscription(undefined, {
    onData(data) {
      setTodos((todos) => [...todos, data.todo]);
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error('Subscription error:', err);
    },
  });

  trpc.todo.onMarkDone.useSubscription(undefined, {
    onData(input) {
      setTodos((todos) => todos.map((todo) => todo.id == input.id ? { ...todo, done: true } : todo));
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error('Subscription error:', err);
    },
  });

  trpc.todo.onMarkUndone.useSubscription(undefined, {
    onData(input) {
      setTodos((todos) => todos.map((todo) => todo.id == input.id ? { ...todo, done: false } : todo));
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error('Subscription error:', err);
    },
  });



  const addTodo = (todo: RouterInput["todo"]["add"]) => mutateAddTodo(todo);

  const markDone = (input: RouterInput["todo"]["markDone"]) =>
    mutateMarkDone({ id: input.id });

  const markUndone = (input: RouterInput["todo"]["markUndone"]) =>
    mutateMarkUndone({ id: input.id });

  return {
    todos,
    addTodo,
    markDone,
    markUndone,
    error,
  };
}
