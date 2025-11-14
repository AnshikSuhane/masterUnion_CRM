import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

 const verifyClerk = (req: Request, res: Response, next: NextFunction) => {
  try {
    return ClerkExpressRequireAuth()(req, res, next);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export default verifyClerk;