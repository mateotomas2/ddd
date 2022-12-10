import { Checkbox, Grid, ListItem } from "@mui/joy";

import { Todo } from "@monorepo/shared";
import { trpc } from "../../utils/trpc";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TodoListTask(props: {
  aggregateId: string;
  todo: Todo;
}) {
  const { todo, aggregateId } = props;
  const { mutate: deleteTodo } = trpc.todo.deleteTodo.useMutation();
  const { mutate: markDone } = trpc.todo.markDone.useMutation();
  const { mutate: markUndone } = trpc.todo.markUndone.useMutation();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <ListItem
      onMouseLeave={() => {
        setShowConfirmDelete(false);
      }}
    >
      <Grid container spacing={1} width={"100%"} alignContent={"center"}>
        <Grid
          container
          justifyContent={"center"}
          alignContent="center"
          margin={"5px 25px 5px 10px"}
          style={{ opacity: todo.done ? "30%" : "100%" }}
        >
          <Checkbox
            checked={todo.done}
            variant="solid"
            onChange={(ev) => {
              if (ev.target.checked)
                markDone({
                  aggregateId: aggregateId,
                  id: todo.id,
                });
              else
                markUndone({
                  aggregateId: aggregateId,
                  id: todo.id,
                });
            }}
          />
        </Grid>
        <Grid
          xs={1}
          flexGrow="1"
          container
          justifyContent={"left"}
          alignContent="center"
          style={{ opacity: todo.done ? "30%" : "100%" }}
        >
          <div
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              padding: "0 0",
            }}
          >
            <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkGfm]}>
              {todo.text}
            </ReactMarkdown>
          </div>
        </Grid>
        <Grid
          container
          justifyContent={"end"}
          alignContent="center"
          minWidth={50}
        >
          {!showConfirmDelete && (
            <DeleteIcon
              color="error"
              cursor={"pointer"}
              onClick={() => {
                setShowConfirmDelete(true);
              }}
            />
          )}

          {showConfirmDelete && (
            <DoneIcon
              color="success"
              cursor={"pointer"}
              onClick={() => {
                deleteTodo({ aggregateId, id: todo.id });
              }}
            />
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}
