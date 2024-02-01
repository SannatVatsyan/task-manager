// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { TaskProps } from './Task'; // Importing TaskProps interface
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Define the TaskFormProps interface to describe the expected properties
interface TaskFormProps {
  onSubmit: (task: Omit<TaskProps, 'id'> & { reminderDate: string; reminderTime: string }) => void; // Function to handle form submission
  onCancel: () => void; // Function to handle form cancellation
  task?: TaskProps | null; // Optional task prop for pre-filling form in case of editing
}

// Define the TaskForm functional component
const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, task }) => {
  // State variables to manage form data and reminder date
  const [formData, setFormData] = useState<Omit<TaskProps, 'id'> & { reminderDate: string; reminderTime: string }>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    completed: false,
    reminderDate: '', // Adding reminderDate to the initial state
    reminderTime: '', // Adding reminderTime to the initial state
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
        reminderDate: task.reminderDate || '', // Setting a default value for reminderDate
        reminderTime: task.reminderTime || '', // Setting a default value for reminderTime
      });
    }
  }, [task]);

  // Event handler for form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Event handler for reminder date input changes
  const handleReminderDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, reminderDate: e.target.value }));
  };

  // Event handler for reminder time input changes
  const handleReminderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, reminderTime: e.target.value }));
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pass both formData, reminderDate, and reminderTime to the onSubmit function
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

      {/* Input field for reminder date */}
      <label>
        Reminder Date:
        <input type="date" name="reminderDate" value={formData.reminderDate} onChange={handleReminderDateChange} />
      </label>

      {/* Input field for reminder time */}
      <label>
        Reminder Time:
        <input type="time" name="reminderTime" value={formData.reminderTime} onChange={handleReminderTimeChange} />
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
