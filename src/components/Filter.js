import React from "react";

const Filter = ({currentFilter, onFilterChange, todosCount, activeTodosCount}) => {
    const filters = [
        {key: 'all', label: 'Все', count: todosCount},
        {key: 'active', label: 'Активные', count: activeTodosCount},
        {key: 'completed', label: 'Выполненые', count: todosCount - activeTodosCount},
    ];

    return (
        <div className="filters">
            {filters.map(filter => (
                <button 
                key={filter.key}
                className={currentFilter === filter.key ? 'filter-btn active' : 'filter-btn'}
                onClick={onFilterChange}
                >
                {filter.label} ({filter.count})
                </button>
            ))}
        </div>
    )
}

export default Filter;