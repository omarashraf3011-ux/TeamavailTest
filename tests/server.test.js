/* eslint-env jest */
const request = require('supertest');
const fs = require('fs');
const path = require('path');

// نجيب server.js كـ app
const app = require('../server'); // لو محتاج تعدل حسب export

describe('API Tests', () => {
  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('POST /save-history should save JSON', async () => {
    const testData = { test: 'value' };
    const response = await request(app)
      .post('/save-history')
      .send(testData)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);

    const historyPath = path.join(__dirname, '../output/history.json');
    const savedData = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    expect(savedData).toEqual(testData);
  });
});
