const gameIsDuplicate = (db, gameData) => {
  return !!db
    .prepare("SELECT * FROM Matches WHERE datePlayed=?")
    .get(gameData.datePlayed);
};

module.exports = gameIsDuplicate;
