// src/components/Filter.tsx
import React from 'react';

interface FilterProps {
  onFilterChange: (status: 'completed' | 'pending' | 'all', priority: 'high' | 'medium' | 'low' | 'all') => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as 'completed' | 'pending' | 'all';
    onFilterChange(status, 'all'); // Reset priority when status changes
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value as 'high' | 'medium' | 'low' | 'all';
    onFilterChange('all', priority); // Reset status when priority changes
  };

  return (
    <div>
      <label>Status:</label>
      <select onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <label>Priority:</label>
      <select onChange={handlePriorityChange}>
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
};

export default Filter;
