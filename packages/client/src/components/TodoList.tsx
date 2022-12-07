import Box from "@mui/joy/Box";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/joy";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Subject } from "rxjs";

import { DevTool } from "./DevTool";
import {
  TodoListType,
  EventType,
  Mapped,
  todoListReducer,
} from "@monorepo/shared";
import { trpc } from "../utils/trpc";

export default function TodoListOffline() {
  const [initialState, setInitialState] = useState<TodoListType>({ todos: [] });
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<TodoListType>(initialState);
  const [events, setEvents] = useState<Mapped[EventType][]>([]);
  const eventBus = useRef<Subject<Mapped[EventType]>>();
  const [currentEventIndex, setEventIndex] = useState<number>(0);

  const { mutate: mutateAddTodo } = trpc.todo.add.useMutation();
  const { mutate: mutateMarkDone } = trpc.todo.markDone.useMutation();
  const { mutate: mutateMarkUndone } = trpc.todo.markUndone.useMutation();

  trpc.todo.onEventReceived.useSubscription(undefined, {
    onData(event) {
      // TODO: not already added event
      dispatch(event);
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error("Subscription error:", err);
    },
  });

  trpc.todo.onTodoListInit.useSubscription(undefined, {
    onData(input) {
      setInitialState({
        todos: input,
      });
      setTodos((todos) => ({
        todos: input,
      }));
    },
    onError(err) {
      // eslint-disable-next-line no-console
      console.error("Subscription error:", err);
    },
  });

  useEffect(() => {
    eventBus.current = new Subject();

    eventBus.current.subscribe((event) => {
      setEventIndex((currentIndex) => currentIndex + 1);
      setEvents((events) => [...events, event]);

      setTodos((state) => todoListReducer({ ...state }, event));
    });
    return () => {
      eventBus.current?.unsubscribe();
    };
  });

  const recreateStateUntilEventIndex = (index: number) => {
    // TODO: Check errors
    let newState = initialState;
    events.slice(0, index).forEach((event) => {
      newState = todoListReducer({ ...newState }, event);
    });

    setTodos(newState);
  };

  const dispatch = (event: Mapped[EventType]) => {
    if (currentEventIndex != events.length) {
      recreateStateUntilEventIndex(events.length);
    }
    setEventIndex(events.length);

    eventBus.current?.next(event);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <DevTool
        events={events}
        onClickEvent={(index) => {
          recreateStateUntilEventIndex(index);
          setEventIndex(index);
        }}
        currentEventIndex={currentEventIndex}
      />
      <Box>
        <List
          variant="soft"
          sx={{ margin: "0px 0px 10px 0px", p: 0, borderRadius: "sm" }}
        >
          <AnimatePresence>
            {todos.todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, height: 0, scale: 0 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0 }}
              >
                <ListItem>
                  <Checkbox
                    label={todo.text}
                    overlay
                    checked={todo.done}
                    onChange={(ev) => {
                      /*if (ev.target.checked)
                        dispatch(
                          createEvent("MarkedDone", {
                            id: todo.id,
                          })
                        );
                      else
                        dispatch(
                          createEvent("MarkedUndone", {
                            id: todo.id,
                          })
                        );*/

                      if (ev.target.checked)
                        mutateMarkDone({
                          id: todo.id,
                        });
                      else
                        mutateMarkUndone({
                          id: todo.id,
                        });
                    }}
                  />
                </ListItem>
                {todos.todos.length !== index + 1 && <Divider />}
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
        <Grid container spacing={1}>
          <Grid xs={9}>
            <TextField
              onChange={(ev) => setNewTask(ev.currentTarget.value)}
              value={newTask}
              placeholder="New task"
            />
          </Grid>
          <Grid xs={3}>
            <Button
              variant="solid"
              disabled={newTask === ""}
              sx={{ width: "100%" }}
              onClick={() => {
                const newTodo = {
                  id: v4(),
                  text: newTask,
                  done: false,
                };
                mutateAddTodo(newTodo);
                //dispatch(createEvent("TodoAdded", newTodo));
                setNewTask("");
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
