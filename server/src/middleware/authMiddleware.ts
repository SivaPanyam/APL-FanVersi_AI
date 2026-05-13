import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Unauthorized: Missing token" });
      return;
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase Token Verification Error:", error);
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
