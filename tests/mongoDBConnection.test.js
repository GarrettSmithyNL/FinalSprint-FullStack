// Unit test for connection to MongoDB
const connectDB = require("../services/Mongo/M.db");

test('MongoDB connection should be successful', async () => {
  await expect(connectDB()).resolves.not.toThrow();
});