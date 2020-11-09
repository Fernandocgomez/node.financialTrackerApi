exports.index = (req, res, next) => {
    res.status(200).json({
        message: "index"
    })
};

exports.create = (req, res, next) => {
    res.status(200).json({
        message: "create"
    })
};