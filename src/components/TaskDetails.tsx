// src/components/TaskDetails.tsx
import React from 'react';

interface TaskDetailsProps {
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ title, description, dueDate, priority, onClose }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
