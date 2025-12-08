

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {


  //проверка на просроченность
  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  //Форматируем дату для отображение
  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Сегодня";
    if (date.toDateString() === tomorrow.toDateString()) return "Завтра";

    return date.toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const handleOpenEditModal = (e) => {
    e.stopPropagation();
    onEdit(todo);
  }


  return (
    
    <div
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
      onClick={handleOpenEditModal}
    >
      <div className="todo-content">
        <div className="todo-checkbox-container" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="checkbox"
          title={
            todo.completed
              ? "Пометить как невыполненное"
              : "Пометить как выполненное"
          }
        />
        </div>
        
        <div className="todo-text-container">
          <div className="todo-text">{todo.text}</div>
          <div className="todo-meta">
            <span className="todo-date">{todo.createAt}</span>
            {todo.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''} `}>
                <span className="due-date-icon">📅</span>
                {formatDueDate(todo.dueDate)}
                {isOverdue && <span className="overdue-badge">!</span>}
              </span> 
            )}
          </div>
        </div>

        <div className="todo-actions" onClick={(e) => e.stopPropagation()}>
          <button 
          onClick={(e) => {
            e.stopPropagation();
            
              onDelete(todo.id);
            
          }}
          title="Удалить задачу"
          className="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;