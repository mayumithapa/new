import express from 'express';
import { initDb } from '../database/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = await initDb();
  const tasks = await db.all('SELECT * FROM tasks');
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const db = await initDb();
  const result = await db.run(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description]
  );

  const newTask = {
    id: result.lastID,
    title,
    description,
  };
  res.status(201).json(newTask);
});

export default router;
