// Import necessary modules and components
import React from 'react';
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Define the TaskDetailsProps interface to describe the expected properties
interface TaskDetailsProps {
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  onClose: () => void;
}

// Define the TaskDetails functional component
const TaskDetails: React.FC<TaskDetailsProps> = ({ title, description, dueDate, priority, onClose }) => {
  return (
    // Container div for the task details
    <div>
      {/* Heading with the task title */}
      <h3>{title}</h3>

      {/* Paragraph with the task description */}
      <p>{description}</p>

      {/* Paragraph displaying the due date of the task */}
      <p>Due Date: {dueDate}</p>

      {/* Paragraph displaying the priority of the task */}
      <p>Priority: {priority}</p>

      {/* Button to close the task details */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

// Export the TaskDetails component as the default export
export default TaskDetails;
