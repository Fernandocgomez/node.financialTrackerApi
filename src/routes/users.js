// Dependencies
const express = require("express");
const router = express.Router();

// Controller
const usersController = require("../controllers/users");

// Routes 
// Create 
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.delete("/:id", usersController.destroy);

module.exports = router;