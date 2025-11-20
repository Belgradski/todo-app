import React from "react";

const Filter = ({currentFilter, onFilterChange, todosCount, activeTodosCount}) => {
    const filters = [
        {key: 'all', label: 'All', count: todosCount},
        {key: 'active', label: 'Active', count: activeTodosCount},
        {key: 'completed', label: 'Completed', count: todosCount - activeTodosCount},
    ];

    return (
        <div className="filters">
            {filters.map(filter => (
                <button 
                key={filters.key}
                className={currentFilter === filters.key ? 'filter-btn active' : 'filter-btn'}
                onClick={onFilterChange}
                >
                {filter.label} ({filter.count})
                </button>
            ))}
        </div>
    )
}

export default Filter;