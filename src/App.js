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
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  //сохранение тудух в localStorage
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos]);

  //сохранение темной темы в localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <header className="header">
          <div className="header-top">
          <h1>My Todo List</h1>
          <button onClick={toggleDarkMode} className="theme-toggle-btn"
          aria-label={darkMode ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          </div>
          <p>{activeTodosCount} активных задач</p>
        </header>

      <TodoForm onAdd={addTodo} />

      <Filter 
        currentFilter={filter}
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
