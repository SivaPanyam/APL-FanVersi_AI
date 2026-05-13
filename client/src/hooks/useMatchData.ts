import { useState, useEffect } from "react";
import { Match } from "@/components/dashboard/MatchCard";

const MOCK_MATCHES: Match[] = [
  {
    id: "1",
    league: "IPL 2026",
    teams: {
      home: { name: "KKR", logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg", score: 185 },
      away: { name: "RCB", logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Royal_Challengers_Bangalore_2020.svg", score: 142 }
    },
    timer: "16.4 Overs",
    quarter: "2nd Innings",
    winProbability: 0.82,
    momentum: 0.7,
    aiInsight: "KKR spinners are choking the run rate. RCB needs boundaries immediately to keep the chase alive.",
    fanCount: "124.5k",
    status: "live"
  },
  {
    id: "2",
    league: "NBA",
    teams: {
      home: { name: "Lakers", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg", score: 104 },
      away: { name: "Warriors", logo: "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg", score: 102 }
    },
    timer: "02:45",
    quarter: "4th",
    winProbability: 0.62,
    momentum: 0.4,
    aiInsight: "Lakers are dominating the paint with an 84% success rate on drives. Expect a focused defensive switch from Warriors in the next play.",
    fanCount: "12.4k",
    status: "live"
  }
];

export function useMatchData() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial fetch
    const timer = setTimeout(() => {
      setMatches(MOCK_MATCHES);
      setLoading(false);
    }, 1500);

    // Simulate live score updates
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (Math.random() > 0.8) {
          const isHome = Math.random() > 0.5;
          return {
            ...match,
            teams: {
              ...match.teams,
              [isHome ? 'home' : 'away']: {
                ...match.teams[isHome ? 'home' : 'away'],
                score: match.teams[isHome ? 'home' : 'away'].score + (match.league === 'NFL' ? 3 : 2)
              }
            }
          };
        }
        return match;
      }));
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return { matches, loading };
}
