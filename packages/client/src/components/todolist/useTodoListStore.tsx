import create from "zustand";
import {
  TodoListType,
  todoListReducer,
  EventTypeMapped,
  initialTodoListState,
} from "@monorepo/shared";
import produce from "immer";

interface TodoListState {
  eventList: EventTypeMapped[];
  state: TodoListType;
  reset: () => void;
  setState: (state: TodoListType) => void;
  addEvent: (event: EventTypeMapped) => void;
}
export const useTodoListStore = create<TodoListState>((set) => ({
  eventList: [],
  state: {
    id: "",
    name: "",
    todos: [],
  },
  reset: () => {
    set(
      produce((draft) => {
        draft.state = initialTodoListState;
        draft.eventList = [];
      })
    );
  },
  setState: (state) => {
    set(
      produce((draft) => {
        draft.state = state;
        draft.eventList = [];
      })
    );
  },
  addEvent: (event) => {
    set(
      produce((draft) => {
        draft.eventList.push(event);
        draft.state = todoListReducer(draft.state, event);
      })
    );
  },
}));
