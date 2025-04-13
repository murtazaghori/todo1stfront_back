import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import { Add } from '@mui/icons-material';

function Addtodoes({ todoInp, setTodoInp, setTodos }) {
  const [todos, setLocalTodos] = useState([]);

 
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(todo => ({
          id: todo._id,
          name: todo.title,
          createdAt: new Date(todo.createdAt).toLocaleString()
        }));
        setLocalTodos(formatted);
        setTodos(formatted);
      });
  }, [setTodos]);

  const handleAddTodo = async () => {
    if (todoInp.trim() === '') {
      alert('You cannot add an empty value');
      return;
    }

    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoInp }),
    });

    const newTodo = await res.json();
    const formatted = {
      id: newTodo._id,
      name: newTodo.title,
      createdAt: new Date(newTodo.createdAt).toLocaleString()
    };

    setLocalTodos(prev => [...prev, formatted]);
    setTodos(prev => [...prev, formatted]);
    setTodoInp('');
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField
          label="Add Your Todo"
          variant="outlined"
          value={todoInp}
          onChange={(e) => setTodoInp(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ height: '100%' }}
          endIcon={<Add />}
        >
          Add
        </Button>
      </div>

      <div className="w-full mt-2" style={{ borderBottom: '2px solid #9c27b0' }} />

      <List>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText
                primary={todo.name}
                secondary={`Created at: ${todo.createdAt}`}
              />
            </ListItem>
          ))
        ) : (
          <div>No todos yet!</div>
        )}
      </List>
    </div>
  );
}

export default Addtodoes;
