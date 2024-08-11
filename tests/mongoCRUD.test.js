// Unit test for CRUD operations in MongoDB, this test does the following; it creates a product, reads the product, 
// updates the product, and deletes the product. The test is done in MongoDB.

const mongoose = require('mongoose');
const connectDB = require('../services/Mongo/M.db');
const Product = require('../services/Mongo/M.products'); // Assuming you have a Product model

// connects to the MongoDB database
beforeAll(async () => {
  await connectDB();
});

// closes the mongoose connection
afterAll(async () => {
  await mongoose.connection.close();
});

test('should create, read, update, and delete a product in MongoDB', async () => {
  const productData = {
    id: 101,
    name: 'Test Product',
    price: 100,
    description: 'Test description',
    release_year: 2021,
    condition: 'New'
  };

  // Create
  const product = new Product(productData);
  await product.save();
  expect(product.isNew).toBe(false);

  // Read
  const foundProduct = await Product.findOne({ name: 'Test Product' });
  expect(foundProduct).not.toBeNull();
  expect(foundProduct.price).toBe(100);

  // Update
  foundProduct.price = 200;
  await foundProduct.save();
  const updatedProduct = await Product.findOne({ name: 'Test Product' });
  expect(updatedProduct.price).toBe(200);

  // Delete
  await Product.deleteOne({ name: 'Test Product' });
  const deletedProduct = await Product.findOne({ name: 'Test Product' });
  expect(deletedProduct).toBeNull();
});