import express from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (
    req: express.Request & { user?: { role: string } },
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(401).json({ error: "Unauthorized" });
      return Promise.resolve();
    }
    return Promise.resolve(next());
  };
};
