import { Request, Response, NextFunction } from "express";
import { generateSportsInsight, chatWithAssistant } from "../ai/geminiEngine.js";
import { verifyIdToken } from "../config/firebase.js";

export const getAIInsight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const strict = process.env.STRICT_AUTH === "true";
    const user = await verifyIdToken(req.headers.authorization);

    if (strict && !user) {
      res.status(401).json({ message: "Authentication required." });
      return;
    }

    const context = typeof req.body?.context === "string" ? req.body.context : "";
    if (!context.trim()) {
      res.status(400).json({ message: "`context` must be a non-empty string." });
      return;
    }

    const text = await generateSportsInsight(context);
    res.json({ text });
  } catch (e) {
    next(e);
  }
};

export const chatAssistant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, history, matchContext } = req.body;
    
    if (!message || typeof message !== "string") {
      res.status(400).json({ message: "`message` is required." });
      return;
    }

    const text = await chatWithAssistant(message, history, matchContext);
    res.json({ text });
  } catch (e) {
    next(e);
  }
};
