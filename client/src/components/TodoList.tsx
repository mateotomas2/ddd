import Box from '@mui/joy/Box';
import { Button, Checkbox, Grid, List, ListItem, Sheet, TextField, Typography } from '@mui/joy';
import { v4 } from 'uuid';
import useTodo from './useTodo';
import { useState } from 'react';

export default function TodoList() {
  const { addTodo, markDone, markUndone, todos } = useTodo();
  const [newTask, setNewTask] = useState<string>('');

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300, bgcolor: 'background.body' }}>
        <Typography
          id="filter-status"
          sx={{
            textTransform: 'uppercase',
            fontSize: 'xs2',
            letterSpacing: 'lg',
            fontWeight: 'lg',
            color: 'text.secondary',
            mb: 2,
          }}
        >
          Filter status
        </Typography>
        <Box role="group" aria-labelledby="filter-status">
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} variant="plain" sx={{ borderRadius: 'sm' }}>
                <Checkbox label={todo.text} color="neutral" overlay checked={todo.done} onChange={(ev) => {
                  if (ev.target.checked) markDone({ id: todo.id })
                  else markUndone({ id: todo.id })

                }} />
              </ListItem>
            ))}
          </List>
          <Grid container spacing={1}>
            <Grid xs={9}>
              <TextField onChange={(ev) => setNewTask(ev.currentTarget.value)} value={newTask} placeholder="New task" />
            </Grid>
            <Grid xs={3}>
              <Button
                variant="outlined"
                disabled={newTask === ''}
                sx={{ width: '100%' }}
                onClick={() => {
                  newTask &&
                    addTodo({
                      text: newTask
                    });
                  setNewTask('');
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Sheet>
    </Grid>
  );
}
