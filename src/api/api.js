import Cookies from 'js-cookie'

const API_URL = `${process.env.REACT_APP_BASE_URL}/tasks`;


// Fetch all tasks
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/${Cookies.get('email')}`);
  const data = await response.json();
  return data;
};

// Add a new task
export const addTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return await response.json();
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
  return await response.json();
};

// Update a task (e.g., marking as complete)
export const updateTask = async (taskId, updatedData) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};
