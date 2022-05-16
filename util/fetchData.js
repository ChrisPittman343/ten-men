/**
 * Returns top player and most recent match data
 * @param {*} db
 */
const getOverview = (db) => {
  let recentMatch = {};
  const statsForMatches = db
    .prepare(
      `
    SELECT *, Teams.score roundsWon FROM Matches 
    INNER JOIN Teams USING(matchID)
    INNER JOIN TeamMembers USING(teamID)
    GROUP BY teamID, playerName
    ORDER BY datePlayed DESC, TeamMembers.teamID DESC, TeamMembers.score DESC
    LIMIT 10
    `
    )
    .all();

  statsForMatches.forEach((stats) => {
    if (!recentMatch.matchID)
      recentMatch = {
        matchID: stats.matchID,
        map: stats.map,
        duration: stats.duration,
        datePlayed: stats.datePlayed,
        players: [],
      };

    if (!stats.wins) stats.wins = 0;

    recentMatch.players.push(stats);
  });

  // Get top 5 overall players' stats to display
  const topPlayers = db
    .prepare(
      `
    SELECT playerName, 
            ROUND(AVG(kills)) avgKills, 
            ROUND(AVG(assists)) avgAssists, 
            ROUND(AVG(deaths)) avgDeaths, 
            ROUND(AVG(score)) avgScore, 
            ROUND(AVG(mvp)) avgMvp, 
            ROUND(AVG(hs)) avgHs, 
            COUNT(*) gamesPlayed,
            (SELECT COUNT(*) FROM TeamMembers TM 
                JOIN Teams ON Teams.teamID=TM.teamID
                WHERE Teams.score = 16 AND
                TeamMembers.playerName = TM.playerName
                GROUP BY TM.playerName
            ) wins
    FROM TeamMembers 
    GROUP BY playerName
    ORDER BY AVG(score) DESC, AVG(kills) DESC
    LIMIT 5
    `
    )
    .all()
    .map((player) =>
      player.wins
        ? player
        : {
            ...player,
            wins: 0,
          }
    );

  return { recentMatch, topPlayers };
};

/**
 * Returns a long list of matches within a time range, no player data.
 * @param {*} db
 * @param {*} startDate date to start searching from. Defaults to 0 (BEGINNING OF TIME)
 * @param {*} endDate date to search until. Defaults to the current date
 */
const getMatches = (db, startDate, endDate) => {
  const matches = [];
  const matchesRows = db
    .prepare(
      `
    SELECT * FROM Matches
    JOIN Teams USING (matchID)
    WHERE datePlayed BETWEEN ? AND ?
    ORDER BY datePlayed DESC
    LIMIT 10
  `
    )
    .all(startDate, endDate);
  for (let i = 0; i < matchesRows.length; i += 2) {
    const teams = matchesRows.slice(i, i + 2);

    matches.push({
      datePlayed: teams[0].datePlayed,
      map: teams[0].map,
      duration: teams[0].duration,
      matchID: teams[0].matchID,
      score: [teams[0].score, teams[1].score],
      teamIDs: [teams[0].teamID, teams[1].teamID],
    });
  }

  return matches;
};

/**
 * Returns a match's data, as well as player averages + maxes.
 * @param {*} db
 * @param {*} datePlayed
 */
const getMatch = (db, datePlayed) => {
  const match = db
    .prepare(
      `
    SELECT *,
      Teams.score roundsWon,
      AVG(kills) avgKills, 
      AVG(assists) avgAssists, 
      AVG(deaths) avgDeaths, 
      AVG(TeamMembers.score) avgScore, 
      AVG(hs) avgHs, 
      AVG(mvp) avgMvp
    
    FROM Matches
    JOIN Teams USING (matchID)
    JOIN TeamMembers USING (teamID)
    WHERE datePlayed = ?
    GROUP BY playerName
  `
    )
    .all(datePlayed);

  return { match };
};

/**
 * Returns basic stats for all players
 * @param {*} db
 */
const getPlayers = (db) => {
  const playersStats = db
    .prepare(
      `
  SELECT  playerName,
          ROUND(AVG(kills)) avgKills, 
          ROUND(AVG(assists)) avgAssists, 
          ROUND(AVG(deaths)) avgDeaths, 
          ROUND(AVG(score)) avgScore, 
          ROUND(AVG(hs)) avgHs, 
          ROUND(AVG(mvp)) avgMvp, 

          COUNT(*) gamesPlayed,
          (SELECT COUNT(*) FROM TeamMembers TM 
              JOIN Teams ON Teams.teamID = TM.teamID
              WHERE Teams.score = 16 AND
              TeamMembers.playerName = TM.playerName
              GROUP BY TM.playerName
          ) wins
  FROM TeamMembers
  GROUP BY playerName
  `
    )
    .all()
    .map((player) => {
      return player.wins
        ? player
        : {
            ...player,
            wins: 0,
          };
    });

  return playersStats;
};

/**
 * Returns an individual player's stats
 * @param {*} db
 * @param {*} playerName
 */
const getPlayer = (db, playerName) => {
  const playerStats = db
    .prepare(
      `
  SELECT  playerName,
         ROUND(AVG(kills)) avgKills, 
         ROUND(AVG(assists)) avgAssists, 
         ROUND(AVG(deaths)) avgDeaths, 
         ROUND(AVG(score)) avgScore, 
         ROUND(AVG(hs)) avgHs, 
         ROUND(AVG(mvp)) avgMvp, 

          MAX(kills) maxKills, 
          MAX(assists) maxAssists, 
          MAX(mvp) maxMvp, 
          MAX(score) maxScore, 

          COUNT(*) gamesPlayed,
          (SELECT COUNT(*) FROM TeamMembers TM 
              JOIN Teams ON Teams.teamID = TM.teamID
              WHERE Teams.score = 16 AND
              TeamMembers.playerName = TM.playerName
              GROUP BY TM.playerName
          ) wins
  FROM TeamMembers 
  WHERE playerName = ?
  `
    )
    .get(playerName);
  if (!playerStats.wins) playerStats.wins = 0;

  const recentGames = db
    .prepare(
      `
      SELECT * FROM TeamMembers
      JOIN Teams USING (teamID)
      JOIN Matches USING (matchID)
      WHERE playerName = ?
      ORDER BY datePlayed DESC
      LIMIT 5
  `
    )
    .all(playerName);

  return { playerStats, recentGames };
};

module.exports = { getPlayer, getPlayers, getOverview, getMatch, getMatches };
