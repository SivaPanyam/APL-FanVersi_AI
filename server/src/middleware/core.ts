import { Request, Response, NextFunction } from "express";

// Logging Middleware
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
};

// Centralized Error Handling Middleware
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[Error] ${err.message}`);
  
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

// Auth Middleware (Placeholder - assuming Firebase Admin is configured)
export const authenticate = async (_req: Request, _res: Response, next: NextFunction) => {
  // In production, we'd verify the Firebase ID token here
  // For now, we'll allow requests to pass through or use a simple check
  next();
};
