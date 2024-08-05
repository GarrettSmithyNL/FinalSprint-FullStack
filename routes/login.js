const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const { checkNotAuthenticated } = require("../config/passport.config.js");
const UsersDAL = require("../services/p.Users.dal.js");

router.use(express.static("public"));

router.get("/", checkNotAuthenticated, async (request, response) => {
  response.render("login", {
    status: request.session.status,
    user: request.user,
  });
  return;
});

router.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/new", checkNotAuthenticated, async (request, response) => {
  response.render("register", {
    status: request.session.status,
    user: request.user,
  });
  return;
});

router.post("/new", checkNotAuthenticated, async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    await UsersDAL.createUser(
      request.body.username,
      request.body.email,
      hashedPassword
    );
    request.session.status = "User created";
    response.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    request.session.status = "Error creating user";
    response.redirect("/login/new");
  }
});

router.delete("/exit", async (request, response, next) => {
  request.logout((error) => {
    if (error) return next(error);
    request.session.status = "Logged out";
    response.redirect("/login");
  });
});

module.exports = router;
