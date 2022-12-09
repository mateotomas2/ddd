import Box from "@mui/joy/Box";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  ModalDialog,
  TextField,
  Typography,
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
import DeleteIcon from "@mui/icons-material/Delete";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function TodoListOffline() {
  // TODO: Clean up the code and move outside to make a dumb component
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
  const { mutate: mutateDeleteTodo } = trpc.todo.deleteTodo.useMutation();

  // TODO: get from props
  const { params } = useMatch(todoListRouter.id);
  const inputRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [todoDelete, setTodoDelete] = useState({ id: "", text: "" });

  trpc.todo.onEventReceived.useSubscription(
    { aggregateId: params.postId },
    {
      onData(event) {
        // TODO: Implement versions and avoid conflicts
        // TODO: Implement syncronization
        dispatch(event);
      },
      onError(err) {
        // TODO: Handle errors better
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

  const addNewTodo = () => {
    {
      const newTodo = {
        id: v4(),
        text: newTask,
        done: false,
      };
      mutateAddTodo({ aggregateId: params.postId, ...newTodo });
      //dispatch(createEvent("TodoAdded", newTodo));
      setNewTask("");
      inputRef.current.querySelector("input").focus();
    }
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
      {/*<DevTool
        events={events}
        onClickEvent={(index) => {
          recreateStateUntilEventIndex(events, index);
          setEventIndex(index);
        }}
        currentEventIndex={currentEventIndex}
      />*/}
      <Box>
        <Typography>{todos.name}</Typography>
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
                  <Grid
                    container
                    spacing={1}
                    width={"100%"}
                    alignContent={"center"}
                  >
                    <Grid
                      xs={2}
                      container
                      justifyContent={"center"}
                      alignContent="center"
                    >
                      <Checkbox
                        checked={todo.done}
                        onChange={(ev) => {
                          // TODO: Implement offline
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
                    </Grid>
                    <Grid
                      xs={8}
                      container
                      justifyContent={"left"}
                      alignContent="center"
                    >
                      <Typography
                        sx={{
                          textDecoration: todo.done ? "line-through" : "none",
                        }}
                      >
                        {todo.text}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={2}
                      container
                      justifyContent={"end"}
                      alignContent="center"
                    >
                      <DeleteIcon
                        cursor={"pointer"}
                        onClick={() => {
                          setOpen(true);
                          setTodoDelete({ id: todo.id, text: todo.text });
                        }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
                {todos.todos.length !== index + 1 && <Divider />}
              </motion.div>
            ))}

            <Modal
              aria-labelledby="alert-dialog-modal-title"
              aria-describedby="alert-dialog-modal-description"
              open={open}
              onClose={() => setOpen(false)}
            >
              <ModalDialog variant="outlined" role="alertdialog">
                <Typography
                  id="alert-dialog-modal-title"
                  component="h2"
                  level="inherit"
                  fontSize="1.25em"
                  mb="0.25em"
                  startDecorator={<WarningRoundedIcon />}
                >
                  Confirmation
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography
                  id="alert-dialog-modal-description"
                  textColor="text.tertiary"
                  mb={3}
                >
                  Do you want to delete this task?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => setOpen(false)}
                  >
                    No
                  </Button>
                  <Button
                    variant="solid"
                    color="danger"
                    onClick={() => {
                      setOpen(false);
                      mutateDeleteTodo({
                        aggregateId: todos.id,
                        id: todoDelete.id,
                      });
                    }}
                  >
                    Yes, delete
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>
          </AnimatePresence>
        </List>
        <Grid container spacing={1}>
          <Grid xs={9}>
            <TextField
              ref={inputRef}
              onChange={(ev) => setNewTask(ev.currentTarget.value)}
              value={newTask}
              autoFocus
              placeholder="New task"
              onKeyDown={(ev) => {
                if (ev.key == "Enter") addNewTodo();
              }}
            />
          </Grid>
          <Grid xs={3}>
            <Button
              variant="solid"
              disabled={newTask === ""}
              sx={{ width: "100%" }}
              onClick={() => addNewTodo()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
