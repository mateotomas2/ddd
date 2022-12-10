import { Grid, useTheme } from "@mui/joy";
import { v4 } from "uuid";
import { useRef } from "react";

import { trpc } from "../../utils/trpc";
import { TextareaAutosize } from "@mui/material";

export default function TodoListAddTodo(props: { aggregateId: string }) {
  const { aggregateId } = props;
  const { mutate: mutateAddTodo } = trpc.todo.add.useMutation();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();

  const addNewTodo = () => {
    {
      const input = inputRef.current;
      if (!input) return;
      const newTodo = {
        id: v4(),
        text: input.value,
        done: false,
      };
      mutateAddTodo({ aggregateId, ...newTodo });
      input.value = "";
      input.focus();
    }
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <TextareaAutosize
          ref={inputRef}
          autoFocus
          placeholder="Add a task"
          style={{
            width: "100%",
            background: theme.palette.background.surface,
            borderRadius: theme.radius.sm,
            borderColor: theme.palette.neutral.outlinedBorder,
            padding: "10px 15px 10px 15px ",
            fontSize: theme.fontSize.md,
            fontFamily: theme.fontFamily.body,
            color: theme.palette.text.secondary,
          }}
          //error={error != null}
          /*
          TODO: Show error message
          helperText={
            error &&
            JSON.parse(error.message).map((error: { message: string }) => (
              <>{error.message}</>
            ))
          }*/
          onKeyDown={(ev) => {
            if (ev.key == "Enter" && !ev.ctrlKey && !ev.shiftKey) {
              ev.preventDefault();
              addNewTodo();
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
