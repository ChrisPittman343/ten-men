const addGame = (db, gameData) => {
  try {
    if (!dataIsValid(gameData)) throw Error("Data is invalid.");

    const insertMatch = db.prepare(
      "INSERT INTO Matches (map, datePlayed, duration) VALUES (?, ?, ?)"
    );
    const insertTeam = db.prepare(
      "INSERT INTO Teams (matchID, score) VALUES (?, ?)"
    );
    const insertTeamMember = db.prepare(
      "INSERT INTO TeamMembers (teamID, playerName, username, ping, kills, assists, deaths, mvp, hs, score) VALUES (?,?,?,?,?,?,?,?,?,?)"
    );

    const insertAll = db.transaction(
      ({ map, datePlayed, duration, score, teams }) => {
        const matchID = insertMatch.run(
          map,
          datePlayed,
          duration
        ).lastInsertRowid;

        teams.forEach((team, teamNum) => {
          const teamID = insertTeam.run(
            matchID,
            score[teamNum]
          ).lastInsertRowid;

          team.forEach((member) => {
            insertTeamMember.run(
              teamID,
              member.playerName,
              member.username,
              member.ping,
              member.kills,
              member.assists,
              member.deaths,
              member.mvp,
              member.hs,
              member.score
            );
          });
        });
      }
    );

    insertAll(gameData);

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Ensures the data being inserted fits the schema
 */
const dataIsValid = (gameData) => {
  const allPlayersNamed = gameData.teams.every((team) =>
    team.every((member) => member.playerName)
  );

  return allPlayersNamed;
};

module.exports = addGame;
