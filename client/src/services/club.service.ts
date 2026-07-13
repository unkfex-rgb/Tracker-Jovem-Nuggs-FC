// ClubStats — Service Layer
// All services are designed so mocks can be replaced with real API calls
// (EA Sports / OurProClub / ProClubsTracker) without changing any UI code.
//
// Future change:
//   const club = await clubService.getClub(id)
// — only the implementation inside this file changes, not the interface.

import type { Club, KPIs, Match, Player, Streak, H2HComparison, ClubSearchResult } from "@/types";
import clubData from "@/data/club.json";
import playersData from "@/data/players.json";
import matchesData from "@/data/matches.json";
import streaksData from "@/data/streaks.json";
import h2hData from "@/data/h2h.json";
import searchResultsData from "@/data/search-results.json";

// Simulate network latency for realistic skeleton states
const delay = (ms: number = 600) => new Promise((resolve) => setTimeout(resolve, ms));

function computeKPIs(club: Club, matches: Match[]): KPIs {
  const wins = club.record.wins;
  const draws = club.record.draws;
  const losses = club.record.losses;
  const total = wins + draws + losses;
  const goalsScored = matches.reduce((sum, m) => sum + m.goalsFor, 0) * (total / matches.length);
  const goalsConceded = matches.reduce((sum, m) => sum + m.goalsAgainst, 0) * (total / matches.length);
  const goalDifference = goalsScored - goalsConceded;
  const winRate = total > 0 ? (wins / total) * 100 : 0;
  const avgGoalsScored = total > 0 ? goalsScored / total : 0;
  const avgGoalsConceded = total > 0 ? goalsConceded / total : 0;
  const points = wins * 3 + draws;
  const pointsPerGame = total > 0 ? points / total : 0;

  return {
    wins,
    draws,
    losses,
    winRate: Math.round(winRate * 10) / 10,
    goalsScored: Math.round(goalsScored),
    goalsConceded: Math.round(goalsConceded),
    goalDifference: Math.round(goalDifference),
    avgGoalsScored: Math.round(avgGoalsScored * 100) / 100,
    avgGoalsConceded: Math.round(avgGoalsConceded * 100) / 100,
    pointsPerGame: Math.round(pointsPerGame * 100) / 100,
  };
}

export const clubService = {
  async getClub(_id: string): Promise<Club> {
    await delay();
    return clubData as Club;
  },

  async getKPIs(_id: string): Promise<KPIs> {
    await delay();
    return computeKPIs(clubData as Club, matchesData as Match[]);
  },

  async getRecentMatches(_id: string, limit: number = 10): Promise<Match[]> {
    await delay();
    return (matchesData as Match[]).slice(0, limit);
  },

  async getPlayers(_id: string): Promise<Player[]> {
    await delay();
    return playersData as Player[];
  },

  async getStreaks(_id: string): Promise<Streak> {
    await delay();
    return streaksData as Streak;
  },

  async getH2H(_clubAId: string, _clubBId: string): Promise<H2HComparison> {
    await delay();
    return h2hData as H2HComparison;
  },

  async searchClubs(query: string, platform?: string): Promise<ClubSearchResult[]> {
    await delay(400);
    let results = searchResultsData as ClubSearchResult[];
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      );
    }
    if (platform && platform !== "ALL") {
      results = results.filter((r) => r.platform === platform);
    }
    return results;
  },
};
