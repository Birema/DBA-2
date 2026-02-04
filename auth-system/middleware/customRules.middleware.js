const { isWorkingHours } = require('../utils/businessRules');

module.exports = (req, res, next) => {
    if (!isWorkingHours()) {
        return res.status(403).json({ message: "Action only allowed 9AM-5PM" });
    }
    next();
};