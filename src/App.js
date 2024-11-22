import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from './api/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import DialogueBox from './components/DialogueBox';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [diagType, setDiagType] = useState('');
  const [diagMsg, setDiagMsg] = useState('');
  const [diagOpen, setDiagOpen] = useState(false);

  const exception = ()=>{
    setDiagMsg(`Unexpected error occurred`)
    setDiagOpen(true)
  }
  const final = () => {
    setTimeout(() => setDiagOpen(false), 3000);
    window.location.reload();
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setFilteredTasks(tasksData); 
    };
    getTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try{
      const newTask = await addTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
      setDiagMsg(`${taskData.title} addedd successfully`)
      setDiagOpen(true)
    }
    catch{
      exception()
    }
    finally{
      final()
    }
  };

  const handleDeleteTask = async (taskId) => {
    try{
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); 
      setDiagMsg(`Task deleted successfully`)
      setDiagOpen(true)
      setDiagType('delete')
    }
    catch{
      exception()
    }
    finally{
      final()
    }
  };

  const handleUpdateTask = async (taskId, updatedTaskData) => {
    try{
      const updatedTask = await updateTask(taskId, updatedTaskData);
      const updatedTasks = tasks.map((task) => 
        task.id === taskId ? updatedTask : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); 
      setDiagMsg(`Task updated successfully`)
      setDiagOpen(true)
    }
    catch{
      exception()
    }
    finally{
      final()
    }
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
      {diagOpen && <DialogueBox msg={diagMsg} type={diagType}/>}
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
