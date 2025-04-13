import React, { useState } from 'react';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction, TextField } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

function TodoList({ todo, setTodos }) {
  const [editInp, setEditInp] = useState(todo.name);
  const [editable, setEditable] = useState(false);

  const handleEditToggle = () => {
    setEditable(prev => !prev);
  };

  const handleSave = async () => {
    if (editInp.trim() === '') {
      alert('You cannot add an empty value');
      return;
    }

    try {
      const res = await fetch(`https://todo1stbakend-el3i-git-master-murtaza-ghoris-projects.vercel.app/api/todos/${todo.id}}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editInp }),
      });

      if (res.ok) {
        setTodos(prev =>
          prev.map(t =>
            t.id === todo.id ? { ...t, name: editInp } : t
          )
        );
        setEditable(false);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`https://todo1stbakend-el3i-git-master-murtaza-ghoris-projects.vercel.app/api/todos/${todo.id}`, {
        method: 'DELETE',
      });

      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ListItem sx={{ backgroundColor: 'whitesmoke', marginBottom: 2, borderRadius: 2 }}>
      <div style={{ width: '80%' }}>
        {editable ? (
          <TextField
            value={editInp}
            onChange={(e) => setEditInp(e.target.value)}
            fullWidth
            variant="outlined"
          />
        ) : (
          <ListItemText primary={todo.name} />
        )}
      </div>
      <ListItemSecondaryAction>
        {!editable ? (
          <IconButton edge="end" onClick={handleEditToggle} color="primary">
            <Edit />
          </IconButton>
        ) : (
          <IconButton edge="end" onClick={handleSave} color="success">
            <Save />
          </IconButton>
        )}
        <IconButton edge="end" onClick={handleDelete} color="error">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TodoList;
