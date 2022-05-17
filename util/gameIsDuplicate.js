const gameIsDuplicate = async (db, gameData) => {
  return !!(
    await db.query("SELECT * FROM Matches WHERE datePlayed = $1", [
      gameData?.datePlayed,
    ])
  ).rows.length;
};

module.exports = gameIsDuplicate;
