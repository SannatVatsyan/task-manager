// src/components/Task.tsx
import React from 'react';

interface TaskProps {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

const Task: React.FC<TaskProps> = ({ title, description, dueDate, priority }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
    </div>
  );
};

export default Task;
