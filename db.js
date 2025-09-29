const { Pool } = require('pg');

// Pool configuration
const pool = new Pool({
  host: process.env.DB_HOST,           // مهم جداً في Cloud Run
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'teamavail',
  password: process.env.DB_PASSWORD || 'secret123',
  database: process.env.DB_NAME || 'teamavail',
  max: 10,
});

// Helper to wait for DB readiness
async function waitForDb(maxRetries = 30, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('✅ Connected to Postgres');
      return;
    } catch (err) {
      console.log(`DB not ready yet (attempt ${i + 1}/${maxRetries}) — retrying in ${delayMs}ms`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Unable to connect to Postgres after multiple attempts');
}

// Debug: print DB config
console.log('DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

module.exports = { pool, waitForDb };
