import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {

  const [status, setStatus] = useState(task.completed)
  const dateobj = new Date(task.deadline)
  const curr = new Date()
  const date = dateobj.toLocaleDateString();
  const time = dateobj.toLocaleTimeString(); 

  return (
    <div className={`task-item${status ? '-completed' : ''}`} id={dateobj > curr ? 'pending' : ''}>
      <div className='taskHolder'>
        <input
          type="checkbox"
          className='taskStatus'
          checked={task.completed}
          onChange={() => {onToggleComplete(task._id); setStatus(!status)}} // Toggle task completion
        />
        <div className='taskContent'>
          <h2>{task.title}</h2>
          <p><b>Description : </b>{task.description}</p>
          <p><b>Deadline : </b>{date + " " + time}</p>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onDelete(task._id)}>Delete</button> {/* Delete task */}
      </div>
    </div>
  );
};

export default TaskItem;
