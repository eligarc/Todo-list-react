import React, { useState } from 'react';
import { todosData } from './todosData';
import './App.sass';

function App() {

  const [todos, setTodos] = useState(todosData);
  const [newTodoText, setNewTodoText] = useState('');

  const toggleTodoStatus = (index) => {
    const updatedTodos = todos.map((todo, i) => i === index
      ? {
        ...todo,
        status: todo.status === 'in progress' ? 'done' : 'in progress'
      }
      : todo
    );

    setTodos(updatedTodos);
  };

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      setTodos([{ text: newTodoText, status: 'in progress' }, ...todos]);
      setNewTodoText('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };


  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type='text'
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder='Escribe una nueva tarea...'
      />
      <button onClick={addTodo}>Agregar</button>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => toggleTodoStatus(index)}
            style={{ color: todo.status === 'done' ? 'green' : 'red' }}
          >
            <span style={{ textDecoration: todo.status === 'done' ? 'line-through' : '' }}>
              {todo.text} - {todo.status}
            </span>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(index); }}>
              <strong>Eliminar</strong>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
