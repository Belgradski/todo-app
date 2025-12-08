import React, { useState, useEffect } from "react";

const EditModal = ({ todo, isOpen, onClose, onSave, onDelete }) => {
  const [editText, setEditText] = useState(todo?.text || "");
  const [dueDate, setDueDate] = useState(todo?.dueDate || "");

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'unset'
    }
    return () => {
        document.body.style.overflow = 'unset'
    }

  }, [isOpen])

  useEffect(() => {
    if (isOpen && todo) {
      setEditText(todo.text);
      setDueDate(todo.dueDate);
    }
  }, [isOpen, todo]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (!isOpen || !todo) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onSave(todo.id, editText.trim(), dueDate || null);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
      onDelete(todo.id);
      onClose()
  };

  const quickDateOptions = [
    {label: 'Сегодня', value: new Date().toISOString().split('T')[0], icon: '📌'},
    {label: 'Завтра', value: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], icon: "⏰"},
    {label: 'Через 3 дня', value: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], icon: "📅"},
    {label: 'Через 7 дней', value: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], icon: "🗓️"},
    {label: 'Без срока', value: '', icon: '❌'}
  ];

  return (
    <div className="edit-modal-overlay" onClick={handleClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h3>Редактировать задачу</h3>
          <button
            className="close-modal-btn"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
                <label htmlFor="todo-text" >Текст задачи</label>
                <textarea 
                id="todo-text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-textarea-modal"
                rows={4}
                placeholder="Введите текс задачи..."
                required
                />
            </div>

            <div className="form-group">
                <label>Срок выполнения</label>
                <div className="quick-date-options">
                    {quickDateOptions.map((option) => (
                        <button 
                        key={option.label}
                        type="button"
                        className={`quick-date-btn ${dueDate === option.value ? 'active' : ''}`}
                        onClick={() => setDueDate(option.value)}
                        >
                            <span className="date-icon">{option.icon}</span>
                            <span className="date-label">{option.label}</span>
                        </button>
                    ))}
                </div>
                <input 
                type="date"
                className="date-input-modal"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input 
                    type="checkbox"
                    className="status-checkbox"
                    checked={todo.completed}
                    readOnly
                    />
                    <span className="checkbox-text">
                        {todo.completed ? 'Задача выполнена' : 'Задача не выполнена'}
                    </span>
                </label>
                <p className="created-date">
                    Создано: {todo.createAt}
                </p>
            </div>

            <div className="modal-actions">
                <button 
                type="button"
                onClick={handleDelete}
                className="delete-modal-btn">
                    🗑️ Удалить
                </button>

                <div className="right-actions">
                    <button
                    className="cancel-modal-btn"
                    onClick={handleClose}
                    type="button"
                    >
                        Отмена</button>
                    <button 
                    type="submit"
                    disabled={!editText.trim()}
                    className="save-modal-btn">
                        💾 Сохранить
                    </button>
                </div>
            </div>

        </form>
      </div>
    </div>
  );
};

export default EditModal;