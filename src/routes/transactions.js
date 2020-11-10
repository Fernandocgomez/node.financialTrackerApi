// Dependencies
const express = require("express");
const router = express.Router();

// Authtentication
const isAuth = require("../middlewares/check-auth");

// Controller
const transactionsController = require("../controllers/transactions");

// Routes
// Get all transactions from the data base
router.get("/", isAuth, transactionsController.index);

// Create a new transaction
router.post("/", isAuth, transactionsController.create);

// Get all the transactions associated with a user
router.get("/my-transactions", isAuth, transactionsController.allTransactionsByUser);

// Get all the transactions associated with a user by category
router.get("/my-transactions-by-category", isAuth, transactionsController.allUserTransactionsByCategory);

// Get total ammount by category
router.get("/total-ammount-by-category", isAuth, transactionsController.totalAmmountByCategory);

// Update transaction 
router.patch("/:id", isAuth, transactionsController.update);

// Delete transaction
router.delete("/:id", isAuth, transactionsController.destroy);

module.exports = router;