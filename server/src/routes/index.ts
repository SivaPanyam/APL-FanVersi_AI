import { Router } from "express";
import { getAllMatches, getMatchById } from "../controllers/matchController.js";
import { submitPrediction, getLeaderboard } from "../controllers/predictionController.js";

// Matches Router
export const matchRouter = Router();
matchRouter.get("/", getAllMatches);
matchRouter.get("/:id", getMatchById);

import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { strictLimiter } from "../middleware/securityMiddleware.js";

// Predictions Router
export const predictionRouter = Router();
predictionRouter.post("/submit", verifyFirebaseToken, strictLimiter, submitPrediction);
predictionRouter.get("/leaderboard", getLeaderboard);

// Users Router (Placeholder)
export const userRouter = Router();
userRouter.get("/profile/:id", (req, res) => res.json({ success: true, user: { id: req.params.id, name: "Fan" } }));
