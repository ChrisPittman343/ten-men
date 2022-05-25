/**
 * Returns top player and most recent match data
 * @param {*} db
 */
const getOverview = async (db) => {
  let recentMatch = {};

  const { rows: statsForMatches } = await db.query(
    `
    SELECT  TeamMembers.playername "playerName", 
            username,
            ping,
            kills,
            assists,
            deaths,
            hs,
            mvp,
            score,
            Teams.teamID "teamID", 
            roundsWon "roundsWon", 
            Matches.matchID "matchID", 
            map, 
            duration, 
            datePlayed "datePlayed" 
    FROM Matches 
    INNER JOIN Teams USING (matchID)
    INNER JOIN TeamMembers USING (teamID)
    GROUP BY playerName, TeamMembers.teamID,  Matches.matchID, Matches.datePlayed, Matches.map, Matches.duration, Teams.matchID, Teams.teamID
    ORDER BY datePlayed DESC, TeamMembers.teamID DESC, TeamMembers.score DESC
    LIMIT 10
    `
  );

  statsForMatches.forEach((stats) => {
    if (!recentMatch.matchID)
      recentMatch = {
        matchID: stats.matchID,
        map: stats.map,
        duration: stats.duration,
        datePlayed: parseInt(stats.datePlayed),
        players: [],
      };

    if (!stats.wins) stats.wins = 0;

    recentMatch.players.push(stats);
  });

  // Get top 5 overall players' stats to display
  let { rows: topPlayers } = await db.query(
    `
    SELECT playerName "playerName", 
            ROUND(AVG(kills))::INTEGER "avgKills", 
            ROUND(AVG(assists))::INTEGER "avgAssists", 
            ROUND(AVG(deaths))::INTEGER "avgDeaths", 
            ROUND(AVG(score))::INTEGER "avgScore", 
            ROUND(AVG(mvp))::INTEGER "avgMvp", 
            ROUND(AVG(hs))::INTEGER "avgHs", 
            COUNT(*) "gamesPlayed",
            (SELECT COUNT(*) FROM TeamMembers TM 
                JOIN Teams ON Teams.teamID=TM.teamID
                WHERE roundsWon = 16 AND
                TeamMembers.playerName = TM.playerName
                GROUP BY TM.playerName
            )::INTEGER "wins"
    FROM TeamMembers 
    GROUP BY playerName
    ORDER BY AVG(score) DESC, AVG(kills) DESC
    LIMIT 5
    `
  );
  topPlayers = topPlayers.map((player) =>
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
const getMatches = async (db, startDate, endDate) => {
  const matches = [];
  const { rows: matchesRows } = await db.query(
    `
    SELECT * FROM Matches
    JOIN Teams USING (matchID)
    WHERE datePlayed BETWEEN $1 AND $2
    ORDER BY datePlayed DESC
    LIMIT 10
  `,
    [startDate, endDate]
  );

  for (let i = 0; i < matchesRows.length; i += 2) {
    const teams = matchesRows.slice(i, i + 2);

    matches.push({
      datePlayed: parseInt(teams[0].dateplayed),
      map: teams[0].map,
      duration: teams[0].duration,
      matchID: teams[0].matchid,
      score: [teams[0].roundswon, teams[1].roundswon],
      teamIDs: [teams[0].teamid, teams[1].teamid],
    });
  }

  return matches;
};

/**
 * Returns a match's data, as well as player averages + maxes.
 * @param {*} db
 * @param {*} datePlayed
 */
const getMatch = async (db, datePlayed) => {
  const { rows: statsForMatches } = await db.query(
    ` SELECT  TeamMembers.playername "playerName", 
            username,
            ping,
            kills,
            assists,
            deaths,
            hs,
            mvp,
            score,
            Teams.teamID "teamID", 
            roundsWon "roundsWon", 
            Matches.matchID "matchID", 
            map, 
            duration, 
            datePlayed "datePlayed" 
    FROM Matches 
    INNER JOIN Teams USING (matchID)
    INNER JOIN TeamMembers USING (teamID)
    WHERE datePlayed = $1
    GROUP BY playerName, TeamMembers.teamID,  Matches.matchID, Matches.datePlayed, Matches.map, Matches.duration, Teams.matchID, Teams.teamID
    ORDER BY TeamMembers.teamID DESC, TeamMembers.score DESC
    LIMIT 10
    `,
    [datePlayed]
  );

  let recentMatch = {};
  statsForMatches.forEach((stats) => {
    if (!recentMatch.matchID)
      recentMatch = {
        matchID: stats.matchID,
        map: stats.map,
        duration: stats.duration,
        datePlayed: parseInt(stats.datePlayed),
        players: [],
      };

    if (!stats.wins) stats.wins = 0;

    recentMatch.players.push(stats);
  });

  return recentMatch;
};

/**
 * Returns basic stats for all players
 * @param {*} db
 */
const getPlayers = async (db) => {
  let { rows: playersStats } = await db.query(
    `
  SELECT  playerName "playerName",
          ROUND(AVG(kills))::INTEGER "avgKills", 
          ROUND(AVG(assists))::INTEGER "avgAssists", 
          ROUND(AVG(deaths))::INTEGER "avgDeaths", 
          ROUND(AVG(score))::INTEGER "avgScore", 
          ROUND(AVG(hs))::INTEGER "avgHs", 
          ROUND(AVG(mvp))::INTEGER "avgMvp", 

          COUNT(*)::INTEGER "gamesPlayed",
          (SELECT COUNT(*) FROM TeamMembers TM 
              JOIN Teams ON Teams.teamID = TM.teamID
              WHERE roundsWon = 16 AND
              TeamMembers.playerName = TM.playerName
              GROUP BY TM.playerName
          )::INTEGER "wins"
  FROM TeamMembers
  GROUP BY playerName
  `
  );

  playersStats = playersStats.map((player) => {
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
const getPlayer = async (db, playerName) => {
  const { rows } = await db.query(
    `
  SELECT  playerName "playerName",
         ROUND(AVG(kills))::INTEGER "avgKills", 
         ROUND(AVG(assists))::INTEGER "avgAssists", 
         ROUND(AVG(deaths))::INTEGER "avgDeaths", 
         ROUND(AVG(score))::INTEGER "avgScore", 
         ROUND(AVG(hs))::INTEGER "avgHs", 
         ROUND(AVG(mvp))::INTEGER "avgMvp", 

          MAX(kills)::INTEGER "maxKills", 
          MAX(assists)::INTEGER "maxAssists", 
          MAX(mvp)::INTEGER "maxMvp", 
          MAX(score)::INTEGER "maxScore", 

          COUNT(*)::INTEGER "gamesPlayed",
          (SELECT COUNT(*) FROM TeamMembers TM 
              JOIN Teams ON Teams.teamID = TM.teamID
              WHERE roundsWon = 16 AND
              TeamMembers.playerName = TM.playerName
              GROUP BY TM.playerName
          )::INTEGER "wins"
  FROM TeamMembers 
  WHERE playerName = $1
  GROUP BY playername
  `,
    [playerName]
  );
  const playerStats = rows[0];
  if (!playerStats.wins) playerStats.wins = 0;

  const { rows: recentGames } = await db.query(
    `
      SELECT * FROM TeamMembers
      JOIN Teams USING (teamID)
      JOIN Matches USING (matchID)
      WHERE playerName = $1
      ORDER BY datePlayed DESC
      LIMIT 5
  `,
    [playerName]
  );

  return { playerStats, recentGames };
};

module.exports = { getPlayer, getPlayers, getOverview, getMatch, getMatches };
