module.exports = (req, res, next) => {
    const resourceId = parseInt(req.params.id);
    if (req.user.id === resourceId || req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: Not your resource" });
    }
};