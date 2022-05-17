const addGame = async (db, gameData) => {
  try {
    if (!dataIsValid(gameData)) throw Error("Data is invalid.");

    const insertMatchSQL =
      "INSERT INTO Matches (map, datePlayed, duration) VALUES ($1, $2, $3) RETURNING matchID";
    const insertTeamSQL =
      "INSERT INTO Teams (matchID, roundsWon) VALUES ($1, $2) RETURNING teamID";
    const insertTeamMemberSQL =
      "INSERT INTO TeamMembers (teamID, playerName, username, ping, kills, assists, deaths, mvp, hs, score) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

    await db.query("BEGIN");
    const { rows } = await db.query(insertMatchSQL, [
      gameData.map,
      gameData.datePlayed,
      gameData.duration,
    ]);
    const { matchid: matchID } = rows[0];

    await Promise.all(
      gameData.teams.map(async (team, teamNum) => {
        const { rows } = await db.query(insertTeamSQL, [
          matchID,
          gameData.score[teamNum],
        ]);
        const { teamid: teamID } = rows[0];

        await Promise.all(
          team.map(async (member) => {
            await db.query(insertTeamMemberSQL, [
              teamID,
              member.playerName,
              member.username,
              member.ping,
              member.kills,
              member.assists,
              member.deaths,
              member.mvp,
              member.hs,
              member.score,
            ]);
          })
        );
      })
    );
    await db.query("COMMIT");
    return true;
  } catch (error) {
    await db.query("ROLLBACK");
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
