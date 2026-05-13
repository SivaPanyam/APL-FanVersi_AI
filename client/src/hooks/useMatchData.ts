import { useState, useEffect } from "react";
import { Match } from "@/components/dashboard/MatchCard";

const MOCK_MATCHES: Match[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
    league: "NFL",
    teams: {
      home: { name: "Chiefs", logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg", score: 24 },
      away: { name: "Eagles", logo: "https://upload.wikimedia.org/wikipedia/en/8/8e/Philadelphia_Eagles_logo.svg", score: 21 }
    },
    timer: "12:10",
    quarter: "3rd",
    winProbability: 0.55,
    momentum: -0.2,
    aiInsight: "Mahomes has a 72% completion rate on long passes today. Eagles secondary is showing signs of fatigue.",
    fanCount: "45.1k",
    status: "live"
  },
  {
    id: "3",
    league: "Champions League",
    teams: {
      home: { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg", score: 2 },
      away: { name: "Man City", logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg", score: 2 }
    },
    timer: "78:00",
    quarter: "2nd Half",
    winProbability: 0.48,
    momentum: 0.1,
    aiInsight: "Possession is split 50/50. Real Madrid tends to score 30% of their goals in the final 10 minutes of UCL matches.",
    fanCount: "89k",
    status: "live"
  },
  {
    id: "4",
    league: "NBA",
    teams: {
      home: { name: "Celtics", logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg", score: 112 },
      away: { name: "Heat", logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg", score: 115 }
    },
    timer: "00:12",
    quarter: "OT",
    winProbability: 0.35,
    momentum: -0.8,
    aiInsight: "Heat has converted 4 out of 5 clutch shots. Celtics need a defensive stop to stay in the game.",
    fanCount: "32k",
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
