import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onAdd(inputValue, dueDate || null);
      setInputValue("");
      setDueDate("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const setTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDueDate(tomorrow.toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Что необходимо сделать?"
        className="todo-input"
      />
      <div className="date-input-container">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
          title="Срок выполнения"
        />

        <button
          type="button"
          onClick={setTomorrow}
          title="Установить срок на завтра"
          className="tomorrow-btn"
        >
          Завтра
        </button>
      </div>
      <button type="submit" className="add-btn">
        Добавить задачу
      </button>
    </form>
  );
};

export default TodoForm;
