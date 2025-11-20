import React, {useState} from "react";

const TodoItem = ({todo, ontoggle, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (editText.trim() !== '') {
            onEdit(todo.id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            setEditText(todo.text)
            setIsEditing(false);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => ontoggle(todo.id)}
                className="checkbox"
                />

                {isEditing ? (
                    <input 
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={handleKeyDown}
                    className="edit-input"
                    autoFocus
                    />
                ) : (
                    <span className="todo-text"
                    onDoubleClick={setIsEditing(true)}
                    >
                        {todo.text}
                    </span>
                )}

                <span className="todo-date">{todo.createAt}</span>
            </div>

            <div className="todo-actions">
                <button onClick={() => setIsEditing(!isEditing)} className="edit-btn" >
                    {isEditing ? '💾' : '✏️'}
                </button>
                <button onClick={() => onDelete(todo.id)} className="delete-btn">
                🗑️
                </button>
            </div>

        </div>
    );

};

export default TodoItem;