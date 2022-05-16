const autocompleteByAliases = (db, gameData) => {
  const { teams } = gameData;
  const stmt = db.prepare(`
  SELECT playerName 
  FROM TeamMembers
  JOIN Teams USING (teamID)
  JOIN Matches USING (matchID)
  WHERE username=? 
  ORDER BY datePlayed DESC 
  `);

  teams.forEach((team, teamIx) => {
    team.forEach((member, memberIx) => {
      const row = stmt.get(member.username);
      Object.assign(gameData.teams[teamIx][memberIx], {
        playerName: row ? row.playerName : null,
      });
    });
  });

  return gameData;
};

module.exports = autocompleteByAliases;
