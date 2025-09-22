// db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'teamavail',
  password: process.env.DB_PASSWORD || 'changeme',
  database: process.env.DB_NAME || 'teamavaildb',
  max: 10,
});

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

module.exports = { pool, waitForDb };
