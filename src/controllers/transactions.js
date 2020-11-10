// Dependencies
const mongoose = require("mongoose");

// Modles 
const Transaction = require("../models/transaction");
const User = require("../models/user");

/**
 * @api {get} /transactions
 * 
 * @apiDescription Get all transactions from the data base
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *       "count": 1,
 *       "transactions": [
 *           {
 *               "_id": "5fa94e39df78a9933015b6d3",
 *               "name": "dad deposit",
 *               "ammount": 300,
 *               "date": "11/09/2020",
 *               "category": "dad",
 *               "user": "5fa946ab2ed2238f9b7737a2"
 *           }
 *       ]
 *   }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */
exports.index = (req, res, next) => {
    Transaction.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            transactions: docs.map(tran => {
                return {
                    _id: tran._id,
                    name: tran.name,
                    ammount: tran.ammount,
                    date: tran.date,
                    category: tran.category,
                    user: tran.user
                }
            })
        }
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};

/**
 * @api {post} /transactions
 * 
 * @apiDescription Create a new transaction
 * 
 * @apiParamExample {json} Request-Example:
 * 
{
    "name": "dad deposit",
    "ammount": 900,
    "date": "11/09/2020",
    "category": "dad",
    "userId": "5fa946ab2ed2238f9b7737a2"
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "transaction has been created",
    "transaction": {
        "_id": "5fa9ffa817a37ca01620a6a8",
        "name": "dad deposit",
        "ammount": 900,
        "date": "11/09/2020",
        "category": "dad",
        "userId": "5fa946ab2ed2238f9b7737a2"
    }
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */
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
            error: error 
        });
    });
};

/**
 * @api {get} /transactions/my-transactions
 * 
 * @apiDescription Get all the transactions associated with a user
 * 
 * @apiParamExample {json} Request-Example:
 * 
{
    "userId": "5fa946ab2ed2238f9b7737a2",
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "_id": "5fa94e39df78a9933015b6d3",
        "name": "dad deposit",
        "ammount": 300,
        "date": "11/09/2020",
        "category": "dad"
    }
]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User doesn't exist"
 *     }
 */
exports.allTransactionsByUser = (req, res, next) => {
    if (req.body.userId) {
        User.findById({_id: req.body.userId})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User doesn't exist"
                });
            }
            Transaction.find()
            .exec()
            .then(allTrans => {
                const filterArr = allTrans.filter(tran => {
                    return tran.user.toString() == req.body.userId
                });
                const response = filterArr.map(tran => {
                    return {
                        _id: tran._id,
                        name: tran.name,
                        ammount: tran.ammount,
                        date: tran.date,
                        category: tran.category
                    }
                });
                res.status(200).json(response);
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error 
            });
        });
    } else {
        return res.status(404).json({
            message: "User id needs to be provided"
        });
    }
};

/**
 * @api {get} /transactions/my-transactions-by-category
 * 
 * @apiDescription Get all the transactions associated with a user by category
 * 
 * @apiParamExample {json} Request-Example:
 * 
{
    "userId": "5fa946ab2ed2238f9b7737a2",
    "category": "dad"
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "_id": "5fa94e39df78a9933015b6d3",
        "name": "dad deposit",
        "ammount": 300,
        "date": "11/09/2020",
        "category": "dad"
    }
]
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User id & category needs to be provided"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User or category are not valid"
 *     }
 */
exports.allUserTransactionsByCategory = (req, res, next) => {
    if(req.body.category && req.body.userId) {
        User.findById({_id: req.body.userId})
        .then(user => {
            const categories = [
                "dad",
                "saving",
                "expenses",
                "debt",
                "fun",
                "kill debt",
                "shopping"
            ]
            const isCategoryValid = categories.includes(req.body.category);
            if (!user || !isCategoryValid) {
                return res.status(404).json({
                    message: "User or category are not valid"
                });
            }
            Transaction.find()
            .exec()
            .then(allTrans => {
                const filterArr = allTrans.filter(tran => {
                    return tran.user.toString() === req.body.userId && tran.category === req.body.category
                });
                const response = filterArr.map(tran => {
                    return {
                        _id: tran._id,
                        name: tran.name,
                        ammount: tran.ammount,
                        date: tran.date,
                        category: tran.category
                    }
                });
                res.status(200).json(response);
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error 
            });
        });
    } else {
        return res.status(404).json({
            message: "User id & category needs to be provided"
        });
    }
};

/**
 * @api {get} /transactions/my-transactions-by-category
 * 
 * @apiDescription Get total ammount by category
 * 
 * @apiParamExample {json} Request-Example:
 * 
{
    "userId": "5fa946ab2ed2238f9b7737a2",
    "category": "dad"
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "totalAmmount": 1700
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User id & category needs to be provided"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User or category are not valid"
 *     }
 */
exports.totalAmmountByCategory = (req, res, next) => {
    if(req.body.category && req.body.userId) {
        User.findById({_id: req.body.userId})
        .then(user => {
            const categories = [
                "dad",
                "saving",
                "expenses",
                "debt",
                "fun",
                "kill debt",
                "shopping"
            ]
            const isCategoryValid = categories.includes(req.body.category);
            if (!user || !isCategoryValid) {
                return res.status(404).json({
                    message: "User or category are not valid"
                });
            }
            Transaction.find()
            .exec()
            .then(allTrans => {
                const filterArr = allTrans.filter(tran => {
                    return tran.user.toString() === req.body.userId && tran.category === req.body.category
                });
                let response = 0;
                for(const tran of filterArr) {
                    response += parseFloat(tran.ammount);
                }
                res.status(200).json({totalAmmount: response});
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error 
            });
        });
    } else {
        return res.status(404).json({
            message: "User id & category needs to be provided"
        });
    }
};

/**
 * @api {patch} /transactions/:id
 * 
 * @apiDescription Update transaction 
 * 
 * @apiParamExample {json} Request-Example:
 * Params are optional
{
    "name": "dad deposit",
    "ammount": "300.00",
    "date": "11/09/2020",
    "category": "dad"
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Transaction has been updated"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */

 exports.update = (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    Transaction.update({_id: id}, payload)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Transaction has been updated"
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    })
};

/**
 * @api {delete} /transactions/:id
 * 
 * @apiDescription Delete transaction
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Transaction has been deleted"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */
exports.destroy = (req, res, next) => {
    const id = req.params.id;
    Transaction.remove({
        _id: id
    })
    .exec()
    .then((result) => {
        console.log(result);
        res.status(200).json({
            message: "Transaction has been deleted"
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    })
};