// Dependencies
const express = require("express");
const router = express.Router();

// Controllers
const SpreedSheetsController = require("../controllers/spreedSheets");

// Routes
// Get categories
router.get("/categories", SpreedSheetsController.categories);

// Get available money
router.get("/available-money", SpreedSheetsController.availableMoney);

module.exports = router;