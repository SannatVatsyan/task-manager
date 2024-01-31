// src/components/Task.tsx
import React from 'react';

export interface TaskProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const Task: React.FC<TaskProps> = ({ title, description, dueDate, priority }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
    </div>
  );
};

export default Task;
