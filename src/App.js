import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import "./App.css"
import EditModal from "./components/EditModal";


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

  const [editingTodo, setEditingTodo] = useState(null);

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

  const addTodo = (text, dueDate = null) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createAt: new Date().toLocaleDateString('ru-RU'),
        dueDate: dueDate
      };
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setEditingTodo(null);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText, newDueDate = null) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, dueDate: newDueDate !== undefined ? newDueDate : todo.dueDate } : todo));
      setEditingTodo(null);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
  }

  const closeEditModal = () => {
    setEditingTodo(null);
  }


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

  const getSortedTodos = () => {
    const filteredTodos = getFilteredTodos();

    return filteredTodos.sort((a, b) => {
      //если нет даты, то вниз
      if (!a.dueDate && !b.dueDate) return 0; //если обе без даты порядок не важен
      if (!a.dueDate) return 1; //если только у а нет даты - a идет после b
      if (!b.dueDate) return -1; //если только у b нет даты - а идет перед b

      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate)
      const now = new Date();

      //просроченные выше остальных
      const aIsOverDue = !a.completed && dateA < now; 
      const bIsOverDue = !b.completed && dateB < now; 

      if (aIsOverDue && !bIsOverDue) return -1; // если a просрочена, b нет -> a выше
      if (!aIsOverDue && bIsOverDue) return 1; // если a не просрочена, b просрочена -> a ниже

      return dateA - dateB;

    });
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const activeTodosCount = todos.filter(todo => !todo.completed).length;


  console.log("Editing todo:", editingTodo);
  console.log("Is modal open?", !!editingTodo);


  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <header className="header">
          <div className="header-top">
          <h1>Список задач</h1>
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
        todos={getSortedTodos()}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={openEditModal}
      />  

      {todos.some(todo => todo.completed) && (
        <button onClick={clearCompleted} className="clear-btn">
          Удалить выполненые
        </button>
      )}
      </div>

      {editingTodo && (
        <EditModal 
        todo={editingTodo}
        isOpen={!!editingTodo}
        onClose={closeEditModal}
        onSave={editTodo}
        onDelete={deleteTodo}
        />
      )}
      
    </div>
  )


}

export default App;
