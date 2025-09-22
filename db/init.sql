CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  payload JSONB,
  created_at TIMESTAMP DEFAULT now()
);
