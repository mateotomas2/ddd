import {
  Box,
  CircularProgress,
  Grid,
  List,
  styled,
  Typography,
} from "@mui/joy";
import { AnimatePresence } from "framer-motion";

import { trpc } from "../../utils/trpc";
import { useTodoListStore } from "./useTodoListStore";
import TodoListAddTodo from "./TodoListAddTodo";
import TodoListTask from "./TodoListTask";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RenderIfVisible from "react-render-if-visible";

export default function TodoList(props: { aggregateId: string }) {
  const { aggregateId } = props;
  const [isLoading, setIsLoading] = useState(true);

  const state = useTodoListStore((state) => state.state);
  //const events = useTodoListStore((state) => state.eventList);
  const addEvent = useTodoListStore((state) => state.addEvent);
  const reset = useTodoListStore((state) => state.reset);
  const setState = useTodoListStore((state) => state.setState);

  useEffect(() => {
    reset();
  }, [aggregateId]);

  trpc.todo.onEventReceived.useSubscription(
    { aggregateId },
    {
      onData(event) {
        // TODO: Implement versions and avoid conflicts
        // TODO: Implement syncronization
        addEvent(event);
      },
    }
  );

  /*trpc.todo.onInitialEvents.useSubscription(
    { aggregateId },
    {
      onData(input) {
        setIsLoading(false);
        input.forEach((event) => addEvent(event));
      },
    }
  );*/

  trpc.todo.onTodoListSnapshot.useSubscription(
    { aggregateId },
    {
      onData(input) {
        reset();
        setIsLoading(false);
        setState(input);
      },
    }
  );

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <CircularProgress />
          </motion.div>
        )}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography
              fontSize={"30px"}
              textAlign="center"
              sx={{ padding: "0 50px" }}
            >
              {state.name}
            </Typography>

            <Box>
              <ListStyleDivider
                variant="soft"
                sx={{
                  margin: "20px 0px 10px 0px",
                  p: 0,
                  borderRadius: "sm",
                  minWidth: "320px",
                }}
              >
                <AnimatePresence>
                  {state.todos.map((todo) => (
                    <RenderIfVisible
                      key={todo.id}
                      defaultHeight={52}
                      visibleOffset={1500}
                    >
                      <TodoListTask aggregateId={aggregateId} todo={todo} />
                    </RenderIfVisible>
                  ))}
                </AnimatePresence>
              </ListStyleDivider>
              <TodoListAddTodo aggregateId={aggregateId} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Grid>
  );
}

const ListStyleDivider = styled(List)`
  div.renderIfVisible + div.renderIfVisible li {
    border-top: 1px solid #444;
    margin-top: -1px;
  }
`;
