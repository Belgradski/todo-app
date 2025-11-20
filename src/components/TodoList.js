import React from "react";
import TodoItem from './TodoItem'

const TodoList = ({todos, filter, onToggle, onDelete, onEdit}) => {
    if (todos.length === 0) {
        return (
            <div className="todo-list">
                <div className="empty-state">
                    {filter === 'completed' ? 'Пока нет выполненных задач'
                    : filter === 'active' ? 'Нет активных задач — отличная работа!'
                : 'Пока нет задач. Добавьте одну выше!'}
                </div>
            </div>
        )
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem 
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
        </div>
    )
}

export default TodoList;