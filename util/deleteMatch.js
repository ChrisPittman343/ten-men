/**
 * Deletes a match (and all dependents, i.e. teams and team members) from the database
 * @param {*} db
 * @param {*} datePlayed
 */
export const deleteMatch = async (db, datePlayed) => {
  try {
    await datePlayed.query(`DELETE FROM Matches WHERE datePlayed = $1`, [
      datePlayed,
    ]);
    return true;
  } catch (error) {
    return false;
  }
};
