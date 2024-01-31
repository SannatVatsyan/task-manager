// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { TaskProps } from './Task'; // Importing TaskProps interface
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Define the TaskFormProps interface to describe the expected properties
interface TaskFormProps {
  onSubmit: (task: Omit<TaskProps, 'id'>) => void; // Function to handle form submission
  onCancel: () => void; // Function to handle form cancellation
  task?: TaskProps | null; // Optional task prop for pre-filling form in case of editing
}

// Define the TaskForm functional component
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, task }) => {
  // State variable to manage form data
  const [formData, setFormData] = useState<Omit<TaskProps, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    completed: false,
  });

  // useEffect to set form data when the task prop changes
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

  // Event handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  // JSX structure for rendering the form
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for task title */}
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>

      {/* Textarea for task description */}
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>

      {/* Input field for task due date */}
      <label>
        Due Date:
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
      </label>

      {/* Dropdown for task priority */}
      <label>
        Priority:
        <select name="priority" value={formData.priority} onChange={handleChange} required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      {/* Submit button with dynamic text based on whether it's an add or edit operation */}
      <button type="submit">{task ? 'Edit Task' : 'Add Task'}</button>

      {/* Cancel button to close the form without submitting */}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

// Export the TaskForm component as the default export
export default TaskForm;
