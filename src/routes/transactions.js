// Dependencies
const express = require("express");
const router = express.Router();

// Controller
const transactionsController = require("../controllers/transactions");

// Routes

// index
router.get("/", transactionsController.index);

// create
router.post("/", transactionsController.create);

module.exports = router;