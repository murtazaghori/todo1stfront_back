import React, { useState } from 'react';
import TodoList from './TodoList';
import { Container, Paper, Typography, List } from '@mui/material';
import Addtodoes from './AddTodoes';

function TodoContainer() {
  const [todos, setTodos] = useState([]);
  const [todoInp, setTodoInp] = useState('');

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: 'linear-gradient(to top left, #7e5bef, #feb47b)',
        paddingTop: 5,
        paddingBottom: 5,
        minHeight: '100vh',
      }}
    >
      <Paper sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo App
        </Typography>
        <Addtodoes todoInp={todoInp} setTodoInp={setTodoInp} setTodos={setTodos} />
        <List>
          {todos.map((todo) => (
            <TodoList key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default TodoContainer;
