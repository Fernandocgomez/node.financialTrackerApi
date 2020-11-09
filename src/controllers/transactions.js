// Dependencies
const mongoose = require("mongoose");
const transaction = require("../models/transaction");

// Modles 
const Transaction = require("../models/transaction");
const User = require("../models/user");

// create a new transaction 
exports.create = (req, res, next) => {
    User.findById(req.body.userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                message: "User can't be found"
            });
        }
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            ammount: req.body.ammount,
            date: req.body.date,
            category: req.body.category,
            user: req.body.userId
        })
        return transaction.save();
    })
    .then(result => {
        res.status(200).json({
            message: "transaction has been created", 
            transaction: {
                _id: result._id,
                name: result.name,
                ammount: result.ammount, 
                date: result.date,
                category: result.category,
                userId: result.user
            }
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Transaction not found",
            error: error 
        });
    });
};

// Get all the transactions associated with a user

// Get all the transactions associated with a user by category

// Get the total ammount by category