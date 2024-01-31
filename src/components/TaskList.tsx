// src/components/TaskList.tsx
import React, { useState, useEffect } from 'react';
import Task, { TaskProps } from './Task';
import Filter from './Filter';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilteredTasks(filterTasks(tasks, 'all'));
  }, [tasks]);

  const filterTasks = (tasksToFilter: TaskProps[], filter: string) => {
    if (filter === 'completed') {
      return tasksToFilter.filter((task) => task.completed);
    } else if (filter === 'pending') {
      return tasksToFilter.filter((task) => !task.completed);
    }
    return tasksToFilter;
  };

  const handleFilterChange = (filter: string) => {
    setFilteredTasks(filterTasks(tasks, filter));
  };

  const handleSort = (key: keyof TaskProps) => {
    const sortedTasks = [...filteredTasks].sort((a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    );
    setFilteredTasks(sortedTasks);
  };

  const handleTaskClick = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleAddTask = (newTask: Omit<TaskProps, 'id'>) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now(), completed: false }]);
    setShowTaskForm(false);
  };

  const handleEditTask = (editedTask: Omit<TaskProps, 'id'>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === selectedTask?.id ? { ...editedTask, id: task.id } : task))
    );
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <button onClick={() => setShowTaskForm(true)}>Add Task</button>
      {showTaskForm && (
        <TaskForm onSubmit={selectedTask ? handleEditTask : handleAddTask} onCancel={() => setShowTaskForm(false)} task={selectedTask} />
      )}
      <Filter onFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('dueDate')}>Due Date</th>
            <th onClick={() => handleSort('priority')}>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} onClick={() => handleTaskClick(task.id)}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>
                <button onClick={() => setShowTaskForm(true)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTask && (
        <TaskDetails
          title={selectedTask.title}
          description={selectedTask.description}
          dueDate={selectedTask.dueDate}
          priority={selectedTask.priority}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
