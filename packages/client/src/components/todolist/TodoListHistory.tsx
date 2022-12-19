import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
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

export default function TodoListHistory(props: { aggregateId: string }) {
  //const { aggregateId } = props;
  //const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  //const state = useTodoListStore((state) => state.state);
  const events = useTodoListStore((state) => state.eventList);
  const replayFromVersion = useTodoListStore(
    (state) => state.replayFromVersion
  );

  return (
    <Box
      key={"startDecorator" || "default"}
      sx={{ position: "absolute", bottom: 10, right: 10 }}
    >
      <Typography>History</Typography>
      <List
        variant="outlined"
        sx={{
          bgcolor: "background.body",
          borderRadius: "sm",
          boxShadow: "sm",
          "--List-decorator-size": "48px",
          "--List-item-paddingLeft": "1.5rem",
          "--List-item-paddingRight": "1rem",
          height: 200,
          overflowY: "auto",
        }}
      >
        {events.map((event, index) => (
          <>
            <ListItem
              key={index}
              onClick={() => {
                replayFromVersion(index);
              }}
            >
              {event.type}
            </ListItem>
            {index <= events.length - 2 && <ListDivider />}
          </>
        ))}
      </List>
    </Box>
  );
}
