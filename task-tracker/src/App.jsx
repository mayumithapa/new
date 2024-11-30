import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  });

  // Fetch tasks from backend
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      // console.log(response)
      .then((data) => setTasks(data));
      // console.log(data)
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  // Handle form submission to add new task
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
        setNewTask({ title: '', description: '' }); // Reset form
      });
  };

  return (
    <div>
      <h1>Task Tracker</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          required
        />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.id}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
