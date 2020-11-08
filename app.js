// Dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Configs 
const app = express();

// Routes
const spreedSheetRoutes = require("./src/routes/spreedSheets");

// Middlewares
const MiddleWares = require("./src/middlewares/errorHandler");

// Terminal logs
app.use(morgan("dev"));

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
app.use("/dashboard", spreedSheetRoutes);

// Error handlers
app.use(MiddleWares.errorHandler);

app.use(MiddleWares.errorHandlerShowMessage);

module.exports = app;