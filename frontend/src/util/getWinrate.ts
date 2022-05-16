export const getWinrate = (wins: number, games: number) =>
  wins ? games / wins : 0;
