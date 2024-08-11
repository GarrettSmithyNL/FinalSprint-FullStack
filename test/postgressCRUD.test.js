// this is a Unit test for CRUD operations in PostgreSQL, this test does the following; it creates a product, reads the product, 
// updates the product, and deletes the product. The test is done in PostgreSQL.


require("dotenv").config();
const pool = require("../services/PG/p.db.js");

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Products (
      product_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description TEXT CHECK (LENGTH(description) >= 15) NOT NULL,
      release_year VARCHAR(4) NOT NULL,
      condition VARCHAR(50) NOT NULL
    );
  `);
  console.log("Table created or already exists.");
});

afterAll(async () => {
  await pool.query(`DROP TABLE IF EXISTS Products;`);
  await pool.end();
  console.log("Table dropped and pool ended.");
});

test('should create, read, update, and delete a product in PostgreSQL', async () => {
  const client = await pool.connect();
  try {
    // Create
    const createQuery = `
      INSERT INTO Products (name, price, description, release_year, condition)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const productData = ['Test Product', 100, 'Test description for product', '2021', 'New'];
    console.log("Creating product with data:", productData);
    const createResult = await client.query(createQuery, productData);
    const createdProduct = createResult.rows[0];
    console.log("Product created:", createdProduct);
    expect(createdProduct).toBeDefined();
    expect(createdProduct.name).toBe('Test Product');

    // Read
    const readQuery = `SELECT * FROM Products WHERE name = $1;`;
    console.log("Reading product with name: 'Test Product'");
    const readResult = await client.query(readQuery, ['Test Product']);
    const foundProduct = readResult.rows[0];
    console.log("Product read:", foundProduct);
    expect(foundProduct).toBeDefined();
    expect(foundProduct.price).toBe('100.00');

    // Update
    const updateQuery = `
      UPDATE Products
      SET price = $1
      WHERE name = $2
      RETURNING *;
    `;
    console.log("Updating product price to 200 for product with name: 'Test Product'");
    const updateResult = await client.query(updateQuery, [200, 'Test Product']);
    const updatedProduct = updateResult.rows[0];
    console.log("Product updated:", updatedProduct);
    expect(updatedProduct.price).toBe('200.00');

    
    // Delete
    const deleteQuery = `DELETE FROM Products WHERE name = $1 RETURNING *;`;
    console.log("Deleting product with name: 'Test Product'");
    const deleteResult = await client.query(deleteQuery, ['Test Product']);
    const deletedProduct = deleteResult.rows[0];
    console.log("Product deleted:", deletedProduct);
    expect(deletedProduct).toBeDefined();


    // Verify Deletion
    console.log("Verifying deletion of product with name: 'Test Product'");
    const verifyDeleteResult = await client.query(readQuery, ['Test Product']);
    console.log("Product verification after deletion:", verifyDeleteResult.rows);
    expect(verifyDeleteResult.rows.length).toBe(0);
  } finally {
    client.release();
  }
});
