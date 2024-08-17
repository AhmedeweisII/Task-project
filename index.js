const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors package
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Use the cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Manager API');
});

// Test database connection
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const { title, description, status, category } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description, status, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status, category]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating task');
    }
  });
  
  // Retrieve all tasks
  app.get('/tasks', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving tasks');
    }
  });
  
  // Update a task
  app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, category } = req.body;
    try {
      const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3, category = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [title, description, status, category, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating task');
    }
  });
  
  // Delete a task
  app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting task');
    }
  });