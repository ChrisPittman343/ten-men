/**
 * Returns the integer rounded winrate (wins / games)
 */
export const getWinrate = (wins: number, games: number) =>
  wins ? Math.round((wins / games) * 100) / 100 : 0;
