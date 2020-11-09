// Dependencies
const mongoose = require("mongoose");
const transaction = require("../models/transaction");

// Modles 
const Transaction = require("../models/transaction");

exports.index = (req, res, next) => {
    Transaction.find()
    .populate("name ammount date user")
    .exec()
    .then(transactions => {
        res.status(200).json(transactions);
    })
};

exports.create = (req, res, next) => {
    res.status(200).json({
        message: "create"
    })
};