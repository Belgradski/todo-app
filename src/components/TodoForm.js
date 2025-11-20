import React, {useState} from "react";

const TodoForm = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onAdd(inputValue);
            setInputValue('')
        }
    } 

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
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
            <button type="submit" className="add-btn">
                Добавить задачу
            </button>
        </form>
    );
};

export default TodoForm;