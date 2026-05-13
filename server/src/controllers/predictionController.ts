import { Request, Response, NextFunction } from "express";

export const submitPrediction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { predictionId, choice, userId } = req.body;
    
    if (!predictionId || !choice || !userId) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    // Logic to store in Firestore would go here
    console.log(`User ${userId} predicted ${choice} for ${predictionId}`);

    res.json({ 
      success: true, 
      message: "Prediction recorded!",
      data: { xpPending: 100 }
    });
  } catch (e) {
    next(e);
  }
};

export const getLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Mock leaderboard data
    const topFans = [
      { name: "MatrixKing", xp: 124500, rank: 1 },
      { name: "VersePro", xp: 112200, rank: 2 }
    ];
    res.json({ success: true, data: topFans });
  } catch (e) {
    next(e);
  }
};
