import React, { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } 
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  }
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="checkbox"
        />

        {isEditing ? (
          <textarea
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="edit-textarea"
            autoFocus
            row={3}
          />
        ) : (
          <div className="todo-text" onDoubleClick={handleDoubleClick}>
            {todo.text}
          </div>
        )}

        <span className="todo-date">{todo.createAt}</span>
      </div>

      <div className="todo-actions">
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
