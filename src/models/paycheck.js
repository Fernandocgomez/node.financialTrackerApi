// Dependencies 
const mongoose = require("mongoose");

const paycheckSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ammount: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Paycheck", paycheckSchema);