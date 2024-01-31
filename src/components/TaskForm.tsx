// src/components/TaskForm.tsx
import React, { useState, useEffect } from 'react';
import { TaskProps } from './Task';

interface TaskFormProps {
  onSubmit: (task: Omit<TaskProps, 'id'>) => void;
  onCancel: () => void;
  task?: TaskProps | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, task }) => {
  const [formData, setFormData] = useState<Omit<TaskProps, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: task.completed,
      });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Due Date:
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
      </label>
      <label>
        Priority:
        <select name="priority" value={formData.priority} onChange={handleChange} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">{task ? 'Edit Task' : 'Add Task'}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
