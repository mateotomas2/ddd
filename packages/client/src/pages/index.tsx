import { Grid, TextField } from "@mui/joy";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { history } from "../Layout";
import { trpc } from "../utils/trpc";

export function Index() {
  const [newTodo, setNewTodo] = useState("");
  const {
    mutate: mutateNewTodoList,
    isSuccess,
    data,
  } = trpc.todo.new.useMutation();

  useEffect(() => {
    if (data) history.push(data.id);
  }, [isSuccess]);

  return (
    <Grid
      container
      spacing={1}
      sx={{ width: "100%" }}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid>
        <TextField
          onChange={(ev) => setNewTodo(ev.currentTarget.value)}
          value={newTodo}
          placeholder="New todo list"
          autoFocus
          onKeyDown={(ev) => {
            if (ev.key == "Enter") {
              ev.preventDefault();

              const uuid = v4();
              mutateNewTodoList({
                id: uuid,
                name: newTodo,
              });
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
