const express = require("express");
const router = express.Router();
const { searchProducts: searchPGProducts } = require("../services/PG/p.fulltext.dal");
const Product = require("../services/Mongo/M.products");

router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.render("search", { products: [], query: "" });
  }

  try {
    // Search in PostgreSQL
    const pgProducts = await searchPGProducts(query);
    pgProducts.forEach(product => product.source = 'PostgreSQL');

    // Search in MongoDB
    const mongoProducts = await Product.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') }
      ]
    }).lean();
    mongoProducts.forEach(product => product.source = 'Mongo');

    // Combine results
    const products = [...pgProducts, ...mongoProducts];

    res.render("search", { products, query });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// New route to handle individual product pages
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Try to find the product in MongoDB first
    let product = await Product.findOne({ id: productId });

    if (!product) {
      // If not found in MongoDB, try to find it in PostgreSQL
      const { getProductById } = require("../services/PG/p.fulltext.dal");
      product = await getProductById(productId);
      if (product) {
        product.source = 'PostgreSQL';
      }
    } else {
      product.source = 'Mongo';
    }

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("product", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;