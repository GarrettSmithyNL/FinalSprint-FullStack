if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// Imports
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./config/passport.config");
const connectDB = require("./services/Mongo/M.db");
const Product = require("./services/Mongo/M.products");
const logger = require("./utils/logger");
const checkAdmin = require("./middleware/CheckAdmin");
const adminRouter = require("./routes/admin");


// Variables
const port = parseInt(process.env.PORT) || 3000;
global.DEBUG = process.env.DEBUG === "true" || false;

//passport setup
require("./config/passport.config");

// Connect to MongoDB
connectDB();

// Log server start
logger.info('Server started successfully');

if (!process.env.SESSION_SECRET) {
  console.error("SESSION_SECRET is not defined!");
  process.exit(1); // Exit if the secret is not set
}


// Set up the app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (request, response) => {
  response.render("index", {
    status: request.session.status,
    user: request.user,
  });
  return;
});

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const sessionRouter = require("./routes/session");
app.use("/test", sessionRouter);

const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

//Admin route
app.use("/admin", /*checkAdmin, */ adminRouter);

// Route to fetch products from MongoDB
app.get("/products", checkAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use((request, response) => {
  response.status(404).send("404 - Page not found");
});
