// Get categories
exports.categories = (req, res, next) => {
    try {
        res.status(200).json({
            message: "categories"
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

// Get available money
exports.availableMoney = (req, res, next) => {
    try {
        res.status(200).json({
            message: "availableMoney"
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};