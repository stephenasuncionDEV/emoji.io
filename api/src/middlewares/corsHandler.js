"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CorsHandlerMain = (corsOption) => {
    const corsHandler = (req, res, next) => {
        const origin = req.headers.origin;
        if (corsOption.origin.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    };
    return {
        corsHandler
    };
};
exports.default = CorsHandlerMain;
