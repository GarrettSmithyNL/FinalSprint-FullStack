const request = require('supertest');
const app = require('../index.js'); // Assuming your Express app is exported from index.js

describe('Login Route', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      global.agent = request.agent(server);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET /login should return 200 and render login page', async () => {
    const response = await global.agent.get('/login').redirects(1);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Login'); // Adjust based on your actual login page content
  });
});
