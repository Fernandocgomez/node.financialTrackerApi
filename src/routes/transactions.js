// Dependencies
const express = require("express");
const router = express.Router();

// Controller
const transactionsController = require("../controllers/transactions");

// Routes

// create a new transaction 
router.post("/", transactionsController.create);

// Get all the transactions associated with a user

// Get all the transactions associated with a user by category

// Get the total ammount by category

module.exports = router;