// Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Model 
const User = require("../models/user");

// Signup
exports.signup = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Auth failed"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then((result) => {
                        res.status(201).json({
                            message: "User created"
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            error: error
                        });
                    });
                }
            })
        }
    })
};

// Login
exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then((user) => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            if (result) {
                return res.status(200).json({
                    message: "Auth successful", 
                    userId: user[0]._id || null
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: error
        });
    })
};

// Destroy
exports.destroy = (req, res, next) => {
    User.remove({_id: req.params.id})
    .exec()
    .then((result) => {
        result.status(200).json({
            message: "User deleted"
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};