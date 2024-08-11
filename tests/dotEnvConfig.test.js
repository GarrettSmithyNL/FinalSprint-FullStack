// Unit test to test if the .env folder is set up correctly for the project

require('dotenv').config();

test('Environment variables should be loaded', () => {
  console.log(process.env); // Debugging line to print all environment variables
  expect(process.env).toHaveProperty('PGUSER');
  expect(process.env).toHaveProperty('PGHOST');
  expect(process.env).toHaveProperty('PGDATABASE');
  expect(process.env).toHaveProperty('PGPASSWORD');
  expect(process.env).toHaveProperty('PGPORT');
  expect(process.env).toHaveProperty('PORT');
  expect(process.env).toHaveProperty('SESSION_SECRET');
  expect(process.env).toHaveProperty('DEBUG');
  expect(process.env).toHaveProperty('MONGO_URI');
});