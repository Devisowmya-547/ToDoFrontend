import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from './api/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import DialogueBox from './components/DialogueBox';
import Login from './components/login/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cookies from 'js-cookie';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [diagType, setDiagType] = useState('');
  const [diagMsg, setDiagMsg] = useState('');
  const [diagOpen, setDiagOpen] = useState(false);
  const [left, setLeft] = useState(false);

  const exception = ()=>{
    setDiagMsg(`Unexpected error occurred`)
    setDiagOpen(true)
  }
  const final = () => {
    setTimeout(() => setDiagOpen(false), 3000);
    setDiagType('')
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
      taskData.owner = Cookies.get('email');
      console.log(taskData)
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
      setDiagType('red')
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
    <Router>
      <Routes>
      <Route path='/*' element={<ThemeToggle onToggleTheme={toggleTheme} theme={theme}/>} />
      <Route 
        path='/'
        element={
          Cookies.get('email') === undefined ? <Login/> :
          <div className={theme}>
            <center id='centerToggle'>
              <div className={left ? 'viewLeft' : 'viewRight'}>
                <button onClick={() => {setLeft(true)}}>Add Task</button>
                <button onClick={() => {setLeft(false)}}>View Task</button>
              </div>
            </center>
            <ThemeToggle onToggleTheme={toggleTheme} theme={theme}/>
            {diagOpen && <DialogueBox msg={diagMsg} type={diagType}/>}
            <div className="container">
              <div className='taskForm' id={left ? 'rightintro' : 'hiden'}><TaskForm onSaveTask={handleAddTask} /></div>
              <center className='taskView' id={left ? 'hiden' : 'leftintro'}>
                <SearchBar onSearch={handleSearch} />
                <TaskList
                  tasks={filteredTasks}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                  onToggleComplete={toggleComplete}
                />
              </center>
            </div>
          </div>
        }
      />
      </Routes>
    </Router>
  );
};

export default App;
