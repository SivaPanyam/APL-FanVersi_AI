import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { aiRouter } from "./routes/ai.js";
import { matchRouter, predictionRouter, userRouter } from "./routes/index.js";
import { initFirebaseAdmin } from "./config/firebase.js";

const app = express();
const port = Number(process.env.PORT) || 8787;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Initialize Firebase
initFirebaseAdmin();

import { apiLimiter, xssSanitize, hppProtect } from "./middleware/securityMiddleware.js";

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: clientOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json({ limit: "64kb" }));
app.use(xssSanitize);
app.use(hppProtect);
app.use(apiLimiter);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "fanverse-ai-server", version: "1.0.0" });
});

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ... (existing middleware)

// API Routes
app.use("/api/ai", aiRouter);
app.use("/api/matches", matchRouter);
app.use("/api/predictions", predictionRouter);
app.use("/api/users", userRouter);

// Serve Static Files (Production)
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// SPA Catch-all
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Global Error Handler
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    const message = err instanceof Error ? err.message : "Internal server error";
    const status = typeof (err as { status?: number })?.status === "number"
      ? (err as { status: number }).status
      : 500;
    res.status(status).json({ message });
  }
);

app.listen(port, () => {
  console.log(`\n🚀 FanVerse AI API running at http://localhost:${port}`);
  console.log(`📡 CORS enabled for: ${clientOrigin}\n`);
});
