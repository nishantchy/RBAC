import express from "express";
import verifyToken from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";

const router = express.Router();

// Only admin can access this route
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req: express.Request, res: express.Response) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req: express.Request, res: express.Response) => {
    res.json({ message: "Welcome Manager" });
  }
);

// All can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req: express.Request, res: express.Response) => {
    res.json({ message: "Welcome User" });
  }
);

// Export the router
export default router;
