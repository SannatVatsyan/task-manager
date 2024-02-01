// TaskDetails.tsx

import React from 'react';

// Define the TaskDetailsProps interface to describe the expected properties
interface TaskDetailsProps {
  title: string;
  description: string;
  dueDate: string;
  reminderTime?: string;
  priority: 'high' | 'medium' | 'low';
  onClose: () => void;
}

// Define the TaskDetails functional component
const TaskDetails: React.FC<TaskDetailsProps> = ({ title, description, dueDate, reminderTime, priority, onClose }) => {
  // JSX structure for rendering the component
  return (
    <div>
      <h2>Task Details</h2>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Due Date: {dueDate}</p>
      {reminderTime && <p>Reminder: {dueDate} at {reminderTime}</p>}
      <p>Priority: {priority}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

// Export the TaskDetails component as the default export
export default TaskDetails;
