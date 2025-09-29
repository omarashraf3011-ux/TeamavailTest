// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { pool, waitForDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/input', express.static(path.join(__dirname, 'input')));
app.use('/output', express.static(path.join(__dirname, 'output')));

// Helper: write history file
function writeHistoryFile(payload) {
  const historyPath = path.join(__dirname, 'output', 'history.json');
  const json = JSON.stringify(payload, null, 2);
  fs.writeFileSync(historyPath, json, 'utf8');
  console.log('History saved to file (output/history.json)');
}

// API to save history
app.post('/save-history', async (req, res) => {
  const payload = req.body;
  let savedToDb = false;

  try {
    const q = 'INSERT INTO history (payload) VALUES ($1::jsonb) RETURNING id, created_at';
    const values = [JSON.stringify(payload)];
    const result = await pool.query(q, values);
    savedToDb = true;
    console.log('History saved to DB, id=', result.rows[0].id);
  } catch (err) {
    console.error('DB insert failed (will fallback to file):', err.message || err);
  }

  try {
    writeHistoryFile(payload);
  } catch (fsErr) {
    console.error('Error saving history.json:', fsErr);
    if (!savedToDb) {
      return res.status(500).send('Failed to save history');
    }
  }

  return res.status(200).json({ ok: true, savedToDb });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server (open port immediately, check DB in background)
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });

  // Try to connect to DB in background
  waitForDb()
    .then(() => console.log('✅ Connected to Postgres'))
    .catch((err) => {
      console.error('⚠️ DB not ready after retries:', err.message);
    });

  const graceful = async () => {
    console.log('Shutting down server...');
    server.close(async () => {
      try {
        await pool.end();
        console.log('DB pool closed. Exiting.');
        process.exit(0);
      } catch (err) {
        console.error('Error during pool shutdown', err);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
}

if (require.main === module) {
  startServer();
}

module.exports = app;
