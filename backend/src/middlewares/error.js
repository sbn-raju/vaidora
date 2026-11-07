const errorMiddleware = (err, req, res, next) => {
    err.success ||= false;
    err.message ||= "Internal server error";
    err.statusCode ||= 500;

    res.status(err.statusCode).json({
        success: err.success,
        message: err.message
    });
    next();
};

module.exports = {
    errorMiddleware
};
