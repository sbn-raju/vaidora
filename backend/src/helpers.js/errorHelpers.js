class ErrorHandler extends Error {
    constructor(success, message, statusCode) {
        super(message);
        this.success = success || false;
        this.statusCode = statusCode || 500;
    }
}

module.exports = ErrorHandler;
