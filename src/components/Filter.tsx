// Import necessary modules and components
import React from 'react';
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Define the FilterProps interface to describe the expected properties
interface FilterProps {
  onFilterChange: (status: 'completed' | 'pending' | 'all', priority: 'high' | 'medium' | 'low' | 'all') => void;
}

// Define the Filter functional component
const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  // Event handler for status filter change
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as 'completed' | 'pending' | 'all';
    onFilterChange(status, 'all'); // Reset priority when status changes
  };

  // Event handler for priority filter change
  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value as 'high' | 'medium' | 'low' | 'all';
    onFilterChange('all', priority); // Reset status when priority changes
  };

  // JSX structure for rendering the filter options
  return (
    <div>
      {/* Status filter dropdown */}
      <label>Status:</label>
      <select onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* Line break for better visual separation */}
      <br />

      {/* Priority filter dropdown */}
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

// Export the Filter component as the default export
export default Filter;
