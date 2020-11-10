// Dependencies
const express = require("express");
const router = express.Router();

// Authtentication
const isAuth = require("../middlewares/check-auth");

// Controller
const usersController = require("../controllers/users");

// Routes 
// Create 
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.delete("/:id", isAuth, usersController.destroy);

module.exports = router;