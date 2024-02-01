// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Task, { TaskProps } from './Task'; // Importing Task component and its props
import Filter from './Filter'; // Importing Filter component
import TaskDetails from './TaskDetails'; // Importing TaskDetails component
import TaskForm from './TaskForm'; // Importing TaskForm component
import '/Users/sannatvats/Desktop/Intern/task-manager/src/index.css'; // Importing CSS file

// Default demo tasks
const defaultTasks: TaskProps[] = [
  {
    id: 1,
    title: 'Demo Task 1',
    description: 'This is a demo task with a description.',
    dueDate: '2024-02-15',
    reminderTime: '12:00', // Added reminderTime
    priority: 'high',
    completed: false,
    reminderDate: '', // Added reminderDate
  },
  // ... other tasks
];

// Define the TaskList functional component
const TaskList: React.FC = () => {
  // State variables to manage tasks, filtered tasks, selected task, and task form visibility
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // useEffect to load tasks from localStorage on component mount
  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // If no tasks are stored, set the default tasks
      setTasks((prevTasks) => {
        // Check if tasks already exist to prevent overriding
        if (prevTasks.length === 0) {
          return defaultTasks;
        }
        return prevTasks;
      });
    }
  }, []); // Empty dependency array to run the effect only on mount

  // useEffect to update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilteredTasks(filterTasks(tasks, 'all'));
  }, [tasks]);

  // Function to filter tasks based on a given filter
  const filterTasks = (tasksToFilter: TaskProps[], filter: string) => {
    if (filter === 'completed') {
      return tasksToFilter.filter((task) => task.completed);
    } else if (filter === 'pending') {
      return tasksToFilter.filter((task) => !task.completed);
    }
    return tasksToFilter;
  };

  // Handler for filter change
  const handleFilterChange = (filter: string) => {
    setFilteredTasks(filterTasks(tasks, filter));
  };

  // Handler for sorting tasks based on a key
  const handleSort = (key: keyof TaskProps) => {
    const sortedTasks = [...filteredTasks].sort((a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    );
    setFilteredTasks(sortedTasks);
  };

  // Handler for clicking on a task to view details
  const handleTaskClick = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  // Handler for adding a new task
  const handleAddTask = (newTask: Omit<TaskProps, 'id'> & { reminderDate: string; reminderTime: string }) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now(), completed: false }];
    console.log('Updated tasks before storing:', updatedTasks);
    setTasks(updatedTasks);
    setShowTaskForm(false);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Schedule the reminder
    scheduleReminder(newTask);
  };

  // Handler for editing an existing task
  const handleEditTask = (editedTask: Omit<TaskProps, 'id'> & { reminderDate: string; reminderTime: string }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === selectedTask?.id ? { ...editedTask, id: task.id } : task))
    );
    setSelectedTask(null);

    // Reschedule the reminder
    scheduleReminder(editedTask);
  };

  // Handler for deleting a task
  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  // Handler for drag-and-drop end
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedTasks = Array.from(filteredTasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setFilteredTasks(reorderedTasks);
  };

  // Handler for checking due dates and showing notifications
  const checkDueDates = () => {
    const today = new Date();

    tasks.forEach((task) => {
      const dueDate = new Date(task.dueDate + ' ' + task.reminderTime);
      const timeDifference = dueDate.getTime() - today.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference < 0) {
        alert(`Task "${task.title}" is overdue!`);
      } else if (daysDifference <= 2) {
        alert(`Task "${task.title}" is approaching its due date!`);
      }
    });
  };

  // Function to schedule the reminder
  const scheduleReminder = (task: Omit<TaskProps, 'id'> & { reminderDate: string; reminderTime: string }) => {
    const reminderDateTime = new Date(task.reminderDate + ' ' + task.reminderTime);
    const now = new Date();

    // If the reminder date and time are in the future, schedule the reminder
    if (reminderDateTime > now) {
      const timeUntilReminder = reminderDateTime.getTime() - now.getTime();
      setTimeout(() => {
        alert(`This is a gentle reminder that your task "${task.title}" is due on ${task.reminderDate} at ${task.reminderTime}!`);
      }, timeUntilReminder);
    }
  };

  // useEffect to check due dates on mount and whenever tasks change
  useEffect(() => {
    checkDueDates();
  }, [tasks]);

  // JSX structure for rendering the component
  return (
    <div>
      {/* Button to add a new task */}
      <br></br><br></br>
      <button id="add_task" onClick={() => setShowTaskForm(true)}>
        Add Task
      </button>

      {/* Conditionally render the TaskForm based on showTaskForm state */}
      {showTaskForm && (
        <TaskForm onSubmit={selectedTask ? handleEditTask : handleAddTask} onCancel={() => setShowTaskForm(false)} task={selectedTask} />
      )}

      {/* Render the Filter component */}
      <Filter onFilterChange={handleFilterChange} />

      {/* Drag-and-drop context for the task list */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Droppable area for the task list */}
        <Droppable droppableId="taskList">
          {(provided) => (
            // Table for displaying tasks
            <table {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                {/* Table header with clickable columns for sorting */}
                <tr>
                  <th onClick={() => handleSort('title')}>Title</th>
                  <th onClick={() => handleSort('description')}>Description</th>
                  <th onClick={() => handleSort('dueDate')}>Due Date</th>
                  <th onClick={() => handleSort('reminderTime')}>Reminder Time</th>
                  <th onClick={() => handleSort('priority')}>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through filtered tasks to create draggable rows */}
                {filteredTasks.map((task, index) => (
                  // Draggable row for each task
                  <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      // Task row with drag props and click handler
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleTaskClick(task.id)}
                      >
                        {/* Task information columns */}
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.reminderTime}</td>
                        <td>{task.priority}</td>

                        {/* Action buttons for editing and deleting tasks */}
                        <td>
                          <button onClick={() => setShowTaskForm(true)}>Edit</button>
                          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {/* Render TaskDetails component when a task is selected */}
      {selectedTask && (
        <TaskDetails
          title={selectedTask.title}
          description={selectedTask.description}
          dueDate={selectedTask.dueDate}
          reminderTime={selectedTask.reminderTime}
          priority={selectedTask.priority}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

// Export the TaskList component as the default export
export default TaskList;
