// Import necessary modules and components
import React from 'react';
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Define the TaskProps interface to describe the expected properties
export interface TaskProps {
  reminderDate: string;
  reminderTime: string;
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

// Define the Task functional component
const Task: React.FC<TaskProps> = ({ title, description, dueDate, priority }) => {
  return (
    // Container div for the task
    <div>
      {/* Heading with the task title */}
      <h3>{title}</h3>

      {/* Paragraph displaying the task description */}
      <p>Description: {description}</p>

      {/* Paragraph displaying the due date of the task */}
      <p>Due Date: {dueDate}</p>

      {/* Paragraph displaying the priority of the task */}
      <p>Priority: {priority}</p>
    </div>
  );
};

// Export the Task component as the default export
export default Task;
