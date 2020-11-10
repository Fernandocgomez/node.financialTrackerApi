// Dependencies
const express = require("express");
const router = express.Router();

// Authtentication
const isAuth = require("../middlewares/check-auth");

// Controller
const paychecksController = require("../controllers/paycheck");


// Routes
// Create user paycheck
router.post("/", isAuth, paychecksController.create);
// Get user paycheck
router.get("/:id", isAuth, paychecksController.show);
// Update user paycheck
router.patch("/:id", isAuth, paychecksController.update);
// Delete user paycheck
router.delete("/:id", isAuth, paychecksController.destroy);

module.exports = router;