import { useEffect, useState } from 'react';
import { fetchTasks, addTask } from './api/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleTaskAdd = (task) => {
    addTask(task)
      .then((response) => setTasks((prev) => [...prev, response.data]))
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <TaskForm onTaskAdd={handleTaskAdd} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
