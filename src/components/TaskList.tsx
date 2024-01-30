// src/components/TaskList.tsx
import React, { useState } from 'react';
import Task from './Task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Sample Task 1',
      description: 'This is a sample task.',
      dueDate: '2022-12-31',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Sample Task 2',
      description: 'Another sample task.',
      dueDate: '2022-11-30',
      priority: 'medium',
    },
    // Add more tasks as needed
  ]);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
        />
      ))}
    </div>
  );
};

export default TaskList;
