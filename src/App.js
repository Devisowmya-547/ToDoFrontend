import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from './api/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setFilteredTasks(tasksData); // Initialize filteredTasks
    };
    getTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    const newTask = await addTask(taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async (taskId) => {
    // Remove the task from the backend (API)
    await deleteTask(taskId);
    // Update tasks and filteredTasks state after deleting
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks as well
  };

  const handleUpdateTask = async (taskId, updatedTaskData) => {
    const updatedTask = await updateTask(taskId, updatedTaskData);
    const updatedTasks = tasks.map((task) => 
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filteredTasks as well
  };

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks as well
  };

  return (
    <div className={theme}>
      <ThemeToggle onToggleTheme={toggleTheme} />
      <SearchBar onSearch={handleSearch} />
      <TaskForm onSaveTask={handleAddTask} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
