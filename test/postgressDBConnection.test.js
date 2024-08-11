// Unit test to check if the PostgreSQL database is connected successfully

require("dotenv").config();
const pool = require("../services/PG/p.db.js");

test('should connect to the PostgreSQL database successfully', async () => {
  const client = await pool.connect();
  try {
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  } finally {
    client.release();
  }
});

// Ensure the pool is closed after all tests
afterAll(async () => {
  await pool.end();
});
