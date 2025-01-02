"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = express_1.default.Router();
// Only admin can access this route
router.get("/admin", authMiddleware_1.default, (0, roleMiddleware_1.authorizeRoles)("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
// Both admin and manager can access this route
router.get("/manager", authMiddleware_1.default, (0, roleMiddleware_1.authorizeRoles)("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" });
});
// All can access this route
router.get("/user", authMiddleware_1.default, (0, roleMiddleware_1.authorizeRoles)("admin", "manager", "user"), (req, res) => {
    res.json({ message: "Welcome User" });
});
// Export the router
exports.default = router;
