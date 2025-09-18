#!/bin/bash

echo "=== Running Prettier (formatting) ==="
npx prettier --write .

echo "=== Running ESLint (code check) ==="
npx eslint .

echo "=== Installing dependencies ==="
npm install

echo "=== Running Tests ==="
npm test

echo "=== Building Docker image ==="
docker build -t teamavail-app .

echo "=== Starting Docker Compose ==="
docker-compose up -d
