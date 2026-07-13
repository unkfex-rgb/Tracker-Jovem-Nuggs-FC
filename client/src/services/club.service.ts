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
  async getClub(id: string, platform: string = "common-gen5"): Promise<Club> {
    try {
      const response = await fetch(`/api/club-stats?clubId=${id}&platform=${platform}`);
      if (!response.ok) throw new Error("Failed to fetch from EA");
      const eaData = await response.json();
      
      // Transform EA data to our Club type
      const clubInfo = Array.isArray(eaData) ? eaData[0] : eaData;
      return {
        id: clubInfo.clubId.toString(),
        name: clubInfo.name,
        platform: platform,
        skillRating: parseInt(clubInfo.skillRating || "0"),
        record: {
          wins: parseInt(clubInfo.wins || "0"),
          draws: parseInt(clubInfo.ties || "0"),
          losses: parseInt(clubInfo.losses || "0"),
        },
        crestUrl: clubInfo.customKit?.crestAssetId 
          ? `https://eafc24.content.easports.com/fifa/fltOnlineAssets/24B23FDE-7835-41C2-87A2-F453DFDB2E82/2024/fcweb/crests/256x256/l${clubInfo.customKit.crestAssetId}.png`
          : undefined
      } as Club;
    } catch (error) {
      console.error("Error fetching club:", error);
      return clubData as Club;
    }
  },

  async getKPIs(id: string): Promise<KPIs> {
    const club = await this.getClub(id);
    return computeKPIs(club, matchesData as Match[]);
  },

  async getRecentMatches(id: string, limit: number = 10): Promise<Match[]> {
    try {
      const response = await fetch(`/api/club-matches?clubId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch matches");
      const matches = await response.json();
      
      // Transform to Match type
      return matches.slice(0, limit).map((m: any) => ({
        id: `${m.date}-${m.opponent}`,
        date: m.date,
        opponent: m.opponent,
        result: m.result as MatchResult,
        goalsFor: m.goalsFor,
        goalsAgainst: m.goalsAgainst,
        possession: 50,
        shots: 0,
        shotsOnTarget: 0,
        division: 1
      }));
    } catch (error) {
      console.error("Error fetching matches:", error);
      return (matchesData as Match[]).slice(0, limit);
    }
  },

  async getPlayers(id: string): Promise<Player[]> {
    try {
      const response = await fetch(`/api/club-members?clubId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch members");
      const members = await response.json();
      
      // Transform to Player type
      return members.map((m: any, idx: number) => ({
        id: `player-${idx}`,
        name: m.name,
        position: m.position === "Goalkeeper" ? "GK" : m.position === "Defender" ? "DEF" : m.position === "Midfielder" ? "MID" : "FWD",
        positionLabel: m.position,
        avgRating: m.rating,
        games: m.games,
        goals: m.goals,
        assists: m.assists,
        avgMatchRating: (m.rating / 100) * 10,
        goalParticipations: m.goals + m.assists
      }));
    } catch (error) {
      console.error("Error fetching players:", error);
      return playersData as Player[];
    }
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
