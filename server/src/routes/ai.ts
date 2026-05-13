import { Router } from "express";
import { getAIInsight, chatAssistant } from "../controllers/aiController.js";

import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { strictLimiter } from "../middleware/securityMiddleware.js";

export const aiRouter = Router();

aiRouter.post("/insight", strictLimiter, getAIInsight);
aiRouter.post("/chat", verifyFirebaseToken, strictLimiter, chatAssistant);
