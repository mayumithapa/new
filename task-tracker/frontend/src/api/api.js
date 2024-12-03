import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchTasks = () => api.get('/tasks');
export const addTask = (task) => api.post('/tasks', task);
