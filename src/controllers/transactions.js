// Dependencies
const mongoose = require("mongoose");

// Modles 
const Transaction = require("../models/transaction");

exports.index = (req, res, next) => {
    Transaction.find()
    .populate("name ammount date user")
    .exec()
    .then(transactions => {
        res.status(200).json(transactions);
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};

exports.create = (req, res, next) => {
    res.status(200).json({
        message: "create"
    })
};