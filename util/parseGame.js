/**
 * Returns an object consisting of parsed game data, or null if there was an error while parsing.
 * @param {string} text a chunk of text copied from the Steam private game data page
 * @returns parsed game data, or null if there was an error while parsing
 */
const parseGame = (text) => {
  try {
    const metaData = getMetaData(text);
    const playerData = getPlayerData(text);

    return { ...metaData, ...playerData };
  } catch (error) {}
};

const getMetaData = (text) => {
  let metaData = toPrettyArray(
    text.slice(0, /Download\s+GOTV\s+Replay/.exec(text).index)
  ).slice(-4);

  const minsSeconds = metaData[3]
    .split(":")
    .slice(1)
    .map((str) => parseInt(str));

  return {
    map: metaData[0].split(" ").slice(1).join(" "), // Usually in form "Competitive Map Name"
    datePlayed: new Date(metaData[1]).getTime(), // Time in MS
    duration: minsSeconds[0] * 60 + minsSeconds[1], // Num seconds
  };
};

const getPlayerData = (text) => {
  let playerDataArray = toPrettyArray(
    text.slice(
      /Player\s+Name\s+Ping\s+K\s+A\s+D\s+★\s+HSP\s+Score/.exec(text).index
    )
  );

  // Grab score and remove from player array
  const score = playerDataArray
    .splice(playerDataArray.length / 2, 1)[0]
    .split(":")
    .map((str) => parseInt(str));

  // Populate array with player JSON data
  const playerArray = [];
  for (let i = 0; i < playerDataArray.length; i += 2) {
    const player = playerDataArray.slice(i, i + 2);
    playerArray.push(parseIndividual(player));
  }

  return {
    score,
    teams: [playerArray.slice(0, 5), playerArray.slice(5)],
  };
};

const parseIndividual = ([username, statsRow]) => {
  // Remove the star and split for easy parseInt usage
  const stats = statsRow.split(/\s+/);

  if (stats.length === 6)
    stats.splice(4, 0, 0); // No MVP stars, insert MVP count as 0
  else if (stats[4] === "★") stats[4] = "1"; // Single star means = 1 MVP
  else stats[4] = stats[4].replace("★", ""); // Remove all stars, can't parse them

  return {
    username,
    ping: parseInt(stats[0]),
    kills: parseInt(stats[1]),
    assists: parseInt(stats[2]),
    deaths: parseInt(stats[3]),
    mvp: parseInt(stats[4]),
    hs: parseInt(stats[5]),
    score: parseInt(stats[6]),
  };
};

/**
 * Splits text by newline chars, removes unnecessary whitespace, and filters out empty lines
 */
const toPrettyArray = (arr) =>
  arr
    .split("\n")
    .map((str) => str.trim().replace(/\s+/, " "))
    .filter((val) => val.length)
    .slice(1);

module.exports = parseGame;
