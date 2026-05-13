import { Request, Response, NextFunction } from "express";

// Mock Service
export const getLiveMatches = async () => {
  return [
    { id: "1", league: "NBA", teams: { home: "Lakers", away: "Warriors" }, score: "104-102", status: "live" },
    { id: "2", league: "NFL", teams: { home: "Chiefs", away: "Eagles" }, score: "24-21", status: "live" }
  ];
};

export const getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await getLiveMatches();
    res.json({ success: true, data: matches });
  } catch (e) {
    next(e);
  }
};

export const getMatchById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const matches = await getLiveMatches();
    const match = matches.find(m => m.id === id);
    
    if (!match) {
      res.status(404).json({ success: false, message: "Match not found" });
      return;
    }
    
    res.json({ success: true, data: match });
  } catch (e) {
    next(e);
  }
};
