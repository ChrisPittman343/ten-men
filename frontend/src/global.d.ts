/// <reference types="svelte" />

// Home page

interface OverviewData {
  recentMatch: OverviewMatch;
  topPlayers: Player[];
}

interface OverviewMatch {
  map: string;
  datePlayed: number;
  matchID: number;
  players: OverviewPlayer[];
}

/**
 * Acts as a row for the Overview table
 */
interface OverviewPlayer {
  playerName: string;
  username: string;
  score: number;
  kills: number;
  assists: number;
  deaths: number;
  hs: number;
  mvp: number;
  ping: number;
  roundsWon: number;
}

// Matches

interface StandaloneMatch {
  datePlayed: number;
  map: string;
  duration: number;
  matchID: number;
  score: [number, number];
  teamIDs: [number, number];
}

// Players

interface Player {
  playerName: string;
  avgAssists: number;
  avgDeaths: number;
  avgKills: number;
  avgScore: number;
  avgMvp: number;
  avgHs: number;
  gamesPlayed: number;
  wins: number;
}

// Other

type NotificationType = "success" | "warning" | "failure";

interface ToastNotification {
  type: NotificationType;
  message: string;
}

interface AuthState {
  isAdmin: boolean;
  isLoading: boolean;
}

type SortDirection = "DESC" | "ASC";
