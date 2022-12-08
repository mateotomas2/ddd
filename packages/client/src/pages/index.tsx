import { Button, Grid, TextField } from "@mui/joy";
import { useState } from "react";
import { v4 } from "uuid";
import { trpc } from "../utils/trpc";

export function Index() {
  const [newTodo, setNewTodo] = useState("");
  const { mutate: mutateNewTodoList } = trpc.todo.new.useMutation();

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
      <Grid xs={9}>
        <TextField
          onChange={(ev) => setNewTodo(ev.currentTarget.value)}
          value={newTodo}
          placeholder="New todo list"
        />
      </Grid>
      <Grid xs={3}>
        <Button
          variant="solid"
          disabled={newTodo === ""}
          sx={{ width: "100%" }}
          onClick={() => {
            const uuid = v4();
            mutateNewTodoList({
              id: uuid,
              name: newTodo,
            });
            window.location = uuid;
            setNewTodo("");
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
