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
  todoListReducer,
  EventTypeMapped,
} from "@monorepo/shared";
import { trpc } from "../utils/trpc";
import { todoListRouter } from "../Layout";
import { useMatch } from "@tanstack/react-router";

export default function TodoListOffline() {
  const [initialState, setInitialState] = useState<TodoListType>({
    id: "",
    name: "",
    todos: [],
  });
  const [newTask, setNewTask] = useState<string>("");
  const [todos, setTodos] = useState<TodoListType>(initialState);
  const [events, setEvents] = useState<EventTypeMapped[]>([]);
  const eventBus = useRef<Subject<EventTypeMapped>>();
  const [currentEventIndex, setEventIndex] = useState<number>(0);

  const { mutate: mutateAddTodo } = trpc.todo.add.useMutation();
  const { mutate: mutateMarkDone } = trpc.todo.markDone.useMutation();
  const { mutate: mutateMarkUndone } = trpc.todo.markUndone.useMutation();
  // TODO: get from props
  const { params } = useMatch(todoListRouter.id);

  /*useEffect(() => {
    mutateSubscribe({ aggregateId: params.id });
  }, []);*/

  trpc.todo.onEventReceived.useSubscription(
    { aggregateId: params.postId },
    {
      onData(event) {
        // TODO: not already added event
        dispatch(event);
      },
      onError(err) {
        // eslint-disable-next-line no-console
        console.error("Subscription error:", err);
      },
    }
  );

  trpc.todo.onTodoListSnapshot.useSubscription(
    { aggregateId: params.postId },
    {
      onData(input) {
        /*setInitialState({
          todos: input,
        });
        setTodos((todos) => ({
          todos: input,
        }));*/
      },
      onError(err) {
        // eslint-disable-next-line no-console
        console.error("Subscription error:", err);
      },
    }
  );

  trpc.todo.onTodoListEvents.useSubscription(
    { aggregateId: params.postId },
    {
      onData(input) {
        setEvents(input);
        setEventIndex(input.length);

        recreateStateUntilEventIndex(input, input.length);
      },
      onError(err) {
        // eslint-disable-next-line no-console
        console.error("Subscription error:", err);
      },
    }
  );

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
  }, []);

  const recreateStateUntilEventIndex = (
    events: EventTypeMapped[],
    index: number
  ) => {
    // TODO: Check errors
    let newState = initialState;
    events.slice(0, index).forEach((event) => {
      newState = todoListReducer({ ...newState }, event);
    });

    setTodos(newState);
  };

  const dispatch = (event: EventTypeMapped) => {
    if (currentEventIndex != events.length) {
      recreateStateUntilEventIndex(events, events.length);
    }
    //setEventIndex(events.length);

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
          recreateStateUntilEventIndex(events, index);
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
                          aggregateId: params.postId,
                          id: todo.id,
                        });
                      else
                        mutateMarkUndone({
                          aggregateId: params.postId,
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
                mutateAddTodo({ aggregateId: params.postId, ...newTodo });
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
