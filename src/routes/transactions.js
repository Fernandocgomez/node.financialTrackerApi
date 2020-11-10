// Dependencies
const express = require("express");
const router = express.Router();

// Controller
const transactionsController = require("../controllers/transactions");

// Routes
// Get all transactions from the data base
router.get("/", transactionsController.index);

// Create a new transaction
router.post("/", transactionsController.create);

// Get all the transactions associated with a user
router.get("/my-transactions", transactionsController.allTransactionsByUser);

// Get all the transactions associated with a user by category
router.get("/my-transactions-by-category", transactionsController.allUserTransactionsByCategory);

// Get total ammount by category
router.get("/total-ammount-by-category", transactionsController.totalAmmountByCategory);

// Update transaction 
router.patch("/:id", transactionsController.update);

// Delete transaction
router.delete("/:id", transactionsController.destroy);

module.exports = router;