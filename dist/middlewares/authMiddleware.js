"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader &&
        typeof authHeader === "string" &&
        authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).send({ message: "No token provided." });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log("The decoded user is:", req.user);
            next();
        }
        catch (error) {
            res.status(403).send({ message: "Token is invalid." });
        }
    }
    else {
        res
            .status(401)
            .send({ message: "Authorization header is missing or malformed." });
    }
};
exports.default = verifyToken;
