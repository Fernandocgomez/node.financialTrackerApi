// Dependencies 
const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    ammount: { type: String, required: true },
    date: { type: String, required: true }, 
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);