// Dependencies
const mongoose = require("mongoose");

// Modles 
const User = require("../models/user");
const Paycheck = require("../models/paycheck");

// Routes
/**
 * @api {post} /paycheck
 * 
 * @apiDescription 
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZmE5NDZhYjJlZDIyMzhmOWI3NzM3YTIiLCJpYXQiOjE2MDQ5ODcwNTEsImV4cCI6MTYwNTA3MzQ1MX0.cv542egX7eHE4DDkROQwasU_impDuDW9mAbE_XcAuwI"
 *     }
 * 
 * @apiParamExample {json} Request-Example:
 * 
{
    "ammount": "100.38",
    "fromDate": "11/09/2020",
    "toDate": "11/29/2020",
    "userId": "5fa946ab2ed2238f9b7737a2"
}
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "paycheck has been created",
    "paycheck": {
        "_id": "5faaa4067aedc9b9c46d5a99",
        "ammount": "100.38",
        "userId": "5fa946ab2ed2238f9b7737a2"
    }
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "User can't be found"
 *     }
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
        const paycheck = new Paycheck({
            _id: new mongoose.Types.ObjectId(),
            ammount: req.body.ammount,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            user: req.body.userId
        });
        return paycheck.save();
    })
    .then(result => {
        res.status(200).json({
            message: "paycheck has been created", 
            paycheck: {
                _id: result._id, 
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
 * @api {get} /paycheck/:id
 * 
 * @apiDescription Get user paycheck
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZmE5NDZhYjJlZDIyMzhmOWI3NzM3YTIiLCJpYXQiOjE2MDQ5ODcwNTEsImV4cCI6MTYwNTA3MzQ1MX0.cv542egX7eHE4DDkROQwasU_impDuDW9mAbE_XcAuwI"
 *     }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "_id": "5faaa61ffc979cbabd7c5f23",
    "ammount": "1000.38",
    "fromDate": "11/09/2020",
    "toDate": "11/29/2020",
    "userId": "5fa946ab2ed2238f9b7737a2"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "message": "Paycheck can't be found"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */
exports.show = (req, res, next) => {
    Paycheck.findById(req.params.id)
    .then(paycheck => {
        if (!paycheck) {
            return res.status(404).json({
                message: "Paycheck can't be found"
            });
        }
        res.status(200).json({
            _id: paycheck._id, 
            ammount: paycheck.ammount,
            fromDate: paycheck.fromDate, 
            toDate: paycheck.toDate, 
            userId: paycheck.user
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error 
        });
    });
}

/**
 * @api {patch} /paycheck/:id
 * 
 * @apiDescription Update user paycheck
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZmE5NDZhYjJlZDIyMzhmOWI3NzM3YTIiLCJpYXQiOjE2MDQ5ODcwNTEsImV4cCI6MTYwNTA3MzQ1MX0.cv542egX7eHE4DDkROQwasU_impDuDW9mAbE_XcAuwI"
 *     }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    message: "Paycheck has been updated"
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
    Paycheck.update({_id: id}, payload)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Paycheck has been updated"
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    })
};

/**
 * @api {delete} /paycheck/:id
 * 
 * @apiDescription Delete user paycheck
 * 
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZmE5NDZhYjJlZDIyMzhmOWI3NzM3YTIiLCJpYXQiOjE2MDQ5ODcwNTEsImV4cCI6MTYwNTA3MzQ1MX0.cv542egX7eHE4DDkROQwasU_impDuDW9mAbE_XcAuwI"
 *     }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Paycheck has been deleted"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
            message: "Paycheck id is not valid"
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server
 *     {
 *       "error": error
 *     }
 */
exports.destroy = (req, res, next) => {
    const id = req.params.id;
    Paycheck.findById(id)
    .then(paycheck => {
        if(!paycheck) {
            return res.status(404).json({
                message: "Paycheck id is not valid"
            });
        }
        Paycheck.remove({
            _id: id
        })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Paycheck has been deleted"
            });
        })
    })
    .catch((error) => {
        res.status(500).json({
            error: error
        });
    })
};