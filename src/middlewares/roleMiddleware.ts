import express from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: express.Request & { user?: { role: string } }, // Extend the Request type
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    next(); // Call next() to pass control to the next middleware
  };
};
