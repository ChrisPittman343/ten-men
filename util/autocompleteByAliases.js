const autocompleteByAliases = async (db, gameData) => {
  const { teams } = gameData;
  const sql = `
  SELECT playerName 
  FROM TeamMembers
  JOIN Teams USING (teamID)
  JOIN Matches USING (matchID)
  WHERE username = $1 
  ORDER BY datePlayed DESC 
  `;

  await Promise.all(
    teams.map(async (team, teamIx) => {
      await Promise.all(
        team.map(async (member, memberIx) => {
          const { rows } = await db.query(sql, [member.username]);
          Object.assign(gameData.teams[teamIx][memberIx], {
            playerName: rows.length ? rows[0].playername : null,
          });
        })
      );
    })
  );
  return gameData;
};

module.exports = autocompleteByAliases;
