const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory tasks array (persist tasks only in memory for now)
let tasks = [];
let lastId = 0;

// API Routes
app.get('/', (req, res) => {
  res.send("TASKS")
});
// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const newTask = { id: ++lastId, ...req.body }; // Create task with a unique id (timestamp)
  tasks.push(newTask); // Add task to the in-memory array
//   console.log(tasks, "1111111111111")
  res.status(201).json(newTask); // Send the created task as response
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
