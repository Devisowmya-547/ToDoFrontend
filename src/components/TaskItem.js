import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)} // Toggle task completion
        />
        <span>{task.title}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onDelete(task.id)}>Delete</button> {/* Delete task */}
      </div>
    </div>
  );
};

export default TaskItem;