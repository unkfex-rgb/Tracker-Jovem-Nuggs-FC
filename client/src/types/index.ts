// ClubStats — Domain Types
// All types are designed to match future API responses from EA Sports / OurProClub / ProClubsTracker

export type Platform = "PS5" | "Xbox" | "PC";

export type MatchResult = "W" | "D" | "L";

export interface Club {
  id: string;
  name: string;
  emblem: string;
  platform: Platform;
  division: number;
  skillRating: number;
  country: string;
  countryCode: string;
  founded: string;
  record: {
    wins: number;
    draws: number;
    losses: number;
  };
}

export interface KPIs {
  wins: number;
  draws: number;
  losses: number;
  winRate: number;
  goalsScored: number;
  goalsConceded: number;
  goalDifference: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  pointsPerGame: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  opponentEmblem?: string;
  result: MatchResult;
  goalsFor: number;
  goalsAgainst: number;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  division: number;
}

export interface Player {
  id: string;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  positionLabel: string;
  avgRating: number;
  games: number;
  goals: number;
  assists: number;
  avgMatchRating: number;
  goalParticipations: number;
}

export interface Streak {
  longestWinStreak: number;
  longestUnbeatenRun: number;
  longestCleanSheetRun: number;
  biggestWin: { score: string; opponent: string };
  worstLoss: { score: string; opponent: string };
  bestCampaign: { season: string; points: number; division: number };
}

export interface H2HComparison {
  clubA: {
    name: string;
    emblem: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    avgPossession: number;
    winRate: number;
  };
  clubB: {
    name: string;
    emblem: string;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    avgPossession: number;
    winRate: number;
  };
  totalMeetings: number;
}

export interface ClubSearchResult {
  id: string;
  name: string;
  emblem: string;
  platform: Platform;
  division: number;
  skillRating: number;
  country: string;
}

export interface RecentSearch {
  id: string;
  name: string;
  platform: Platform;
  timestamp: number;
}
