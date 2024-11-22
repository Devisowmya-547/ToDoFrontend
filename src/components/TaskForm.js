// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSaveTask, task = {} }) => {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [category, setCategory] = useState(task.category || '');
  const [priority, setPriority] = useState(task.priority || 'Medium');
  const [deadline, setDeadline] = useState(task.deadline || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, category, priority, deadline };
    onSaveTask(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description"></textarea>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <button type="submit">{task.id ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
