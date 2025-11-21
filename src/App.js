import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import "./App.css"


function App() {
  const [todos, setTodos] = useState(() => {
    const savedtodos = localStorage.getItem('todos');
    return savedtodos ? JSON.parse(savedtodos) : [];
  });
  const [filter, setFilter] = useState('all');

  //сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createAt: new Date().toLocaleDateString()
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>My Todo List</h1>
          <p>{activeTodosCount} активных задач</p>
        </header>

      <TodoForm onAdd={addTodo} />

      <Filter 
        currentFIlter={filter}
        onFilterChange={setFilter}
        todosCount={todos.length}
        activeTodosCount={activeTodosCount}
      />

      <TodoList 
        todos={getFilteredTodos()}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />  

      {todos.some(todo => todo.completed) && (
        <button onClick={clearCompleted} className="clear-btn">
          Удалить выполненые
        </button>
      )}
      </div>
    </div>
  )


}

export default App;
