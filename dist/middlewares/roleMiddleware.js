"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(401).json({ error: "Unauthorized" });
            return Promise.resolve();
        }
        return Promise.resolve(next());
    };
};
exports.authorizeRoles = authorizeRoles;
