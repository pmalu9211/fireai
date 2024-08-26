"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res
// next: NextFunction
) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        error: Object.assign({ message }, (process.env.NODE_ENV === "development" && { stack: err.stack })),
    });
};
exports.default = errorHandler;
