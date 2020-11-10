// Dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Configs 
const app = express();

// Terminal logs
app.use(morgan("dev"));

// connect to mongo DB 
const mongoUrl = "mongodb+srv://" + process.env.MONGO_ATLAS_USERNAME + ":" + process.env.MONGO_ATLAS_PW + "@financial-tracker.bqxbb.mongodb.net/" + process.env.MONGO_ATLAS_NAME + "?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise;

// Import routes
const transactionsRoutes = require("./src/routes/transactions");
const usersRoutes = require("./src/routes/users");
const paycheckRoutes = require("./src/routes/paycheck");

// Middlewares
const MiddleWares = require("./src/middlewares/errorHandler");

// Parse body from incomming request
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use("/transactions", transactionsRoutes);
app.use("/users", usersRoutes);
app.use("/paycheck", paycheckRoutes);

// Error handlers
app.use(MiddleWares.errorHandler);

app.use(MiddleWares.errorHandlerShowMessage);

module.exports = app;