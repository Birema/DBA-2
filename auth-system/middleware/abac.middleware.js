module.exports = (requiredDept) => {
    return (req, res, next) => {
        // Step 8 logic: Check department attribute from token
        if (req.user.department === requiredDept || req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: `Access Denied: ${requiredDept} department only` });
        }
    };
};