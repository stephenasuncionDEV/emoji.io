"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const { status } = err;
    res.status(status | 500).json({
        status: err.status,
        message: err.message
    });
};
exports.default = errorHandler;
