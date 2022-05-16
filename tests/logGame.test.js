const addGame = require("../util/addGame");
const parseGame = require("../util/parseGame");
const gameIsDuplicate = require("../util/gameIsDuplicate");
const autocompleteByAliases = require("../util/autocompleteByAliases");
const getFreshDB = require("./getFreshDB");

// todo: implement setup / teardown  https://jestjs.io/docs/setup-teardown

/**
 * This game checks if there are:
 * - 0, 1, 2+ MVPs
 * - 0% Headshots (empty)
 * - - All combinations of the above
 * - Excess content above and below match data
 */
const sampleGame = `
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    Competitive Dust II
    2022-05-10 02:20:56 GMT
    Wait Time: 00:28
    Match Duration: 42:51
    Download GOTV Replay
    
    Player Name	Ping	K	A	D	★	HSP	Score
    
    オバマ氏 Jort
    29	21	5	13	★4		57 
    
    Echoriver
    42	24	5	11	★4	50%	56
    
    Nik
    61	16	2	10	★5	31%	46
    
    _cosmic_dolphin_(gamer)
    14	20	3	12	★2	45%	44
    
    Cawmoo
    74	11	2	13	      	30 
    16 : 7
    
    BarnacleMan
    28	20	4	16	★3	60%	57
    
    Photorealistic B1GJOK3
    16	13	3	18	★2	38%	34
    
    QCMBR
    10	9	4	19	★	33%	28
    
    provolone
    6	8	2	21	★     	24   
    
    Grima Wormtongue
    16	9	0	18	 	44%	 22
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    `;

const sampleGameNoReplay = `
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    Competitive Dust II
    2022-05-10 02:20:56 GMT
    Wait Time: 00:28
    Match Duration: 42:51
    
    Player Name	Ping	K	A	D	★	HSP	Score
    
    オバマ氏 Jort
    29	21	5	13	★4		57 
    
    Echoriver
    42	24	5	11	★4	50%	56
    
    Nik
    61	16	2	10	★5	31%	46
    
    _cosmic_dolphin_(gamer)
    14	20	3	12	★2	45%	44
    
    Cawmoo
    74	11	2	13	      	30 
    16 : 7
    
    BarnacleMan
    28	20	4	16	★3	60%	57
    
    Photorealistic B1GJOK3
    16	13	3	18	★2	38%	34
    
    QCMBR
    10	9	4	19	★	33%	28
    
    provolone
    6	8	2	21	★     	24   
    
    Grima Wormtongue
    16	9	0	18	 	44%	 22
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    ** OTHER CONTENT **
    `;

const expectedOutput = {
  map: "Dust II",
  datePlayed: 1652149256000, // Time in MS
  duration: 2571, // Num seconds
  score: [16, 7],
  teams: [
    [
      {
        username: "オバマ氏 Jort",
        ping: 29,
        kills: 21,
        assists: 5,
        deaths: 13,
        mvp: 4,
        hs: 0,
        score: 57,
      },
      {
        username: "Echoriver",
        ping: 42,
        kills: 24,
        assists: 5,
        deaths: 11,
        mvp: 4,
        hs: 50,
        score: 56,
      },
      {
        username: "Nik",
        ping: 61,
        kills: 16,
        assists: 2,
        deaths: 10,
        mvp: 5,
        hs: 31,
        score: 46,
      },
      {
        username: "_cosmic_dolphin_(gamer)",
        ping: 14,
        kills: 20,
        assists: 3,
        deaths: 12,
        mvp: 2,
        hs: 45,
        score: 44,
      },
      {
        username: "Cawmoo",
        ping: 74,
        kills: 11,
        assists: 2,
        deaths: 13,
        mvp: 0,
        hs: 0,
        score: 30,
      },
    ],
    [
      {
        username: "BarnacleMan",
        ping: 28,
        kills: 20,
        assists: 4,
        deaths: 16,
        mvp: 3,
        hs: 60,
        score: 57,
      },
      {
        username: "Photorealistic B1GJOK3",
        ping: 16,
        kills: 13,
        assists: 3,
        deaths: 18,
        mvp: 2,
        hs: 38,
        score: 34,
      },
      {
        username: "QCMBR",
        ping: 10,
        kills: 9,
        assists: 4,
        deaths: 19,
        mvp: 1,
        hs: 33,
        score: 28,
      },
      {
        username: "provolone",
        ping: 6,
        kills: 8,
        assists: 2,
        deaths: 21,
        mvp: 1,
        hs: 0,
        score: 24,
      },
      {
        username: "Grima Wormtongue",
        ping: 16,
        kills: 9,
        assists: 0,
        deaths: 18,
        mvp: 0,
        hs: 44,
        score: 22,
      },
    ],
  ],
};

const finalOutput = {
  map: "Dust II",
  datePlayed: 1652149256000, // Time in MS
  duration: 2571, // Num seconds
  score: [16, 7],
  teams: [
    [
      {
        playerName: "Jordan S.",
        username: "オバマ氏 Jort",
        ping: 29,
        kills: 21,
        assists: 5,
        deaths: 13,
        mvp: 4,
        hs: 0,
        score: 57,
      },
      {
        playerName: "Alex B.",
        username: "Echoriver",
        ping: 42,
        kills: 24,
        assists: 5,
        deaths: 11,
        mvp: 4,
        hs: 50,
        score: 56,
      },
      {
        playerName: "Nik A.",
        username: "Nik",
        ping: 61,
        kills: 16,
        assists: 2,
        deaths: 10,
        mvp: 5,
        hs: 31,
        score: 46,
      },
      {
        playerName: "Brendan T.",
        username: "_cosmic_dolphin_(gamer)",
        ping: 14,
        kills: 20,
        assists: 3,
        deaths: 12,
        mvp: 2,
        hs: 45,
        score: 44,
      },
      {
        playerName: "Vincent",
        username: "Cawmoo",
        ping: 74,
        kills: 11,
        assists: 2,
        deaths: 13,
        mvp: 0,
        hs: 0,
        score: 30,
      },
    ],
    [
      {
        playerName: "Brooks B.",
        username: "BarnacleMan",
        ping: 28,
        kills: 20,
        assists: 4,
        deaths: 16,
        mvp: 3,
        hs: 60,
        score: 57,
      },
      {
        playerName: "Nick P.",
        username: "Photorealistic B1GJOK3",
        ping: 16,
        kills: 13,
        assists: 3,
        deaths: 18,
        mvp: 2,
        hs: 38,
        score: 34,
      },
      {
        playerName: "Ian M.",
        username: "QCMBR",
        ping: 10,
        kills: 9,
        assists: 4,
        deaths: 19,
        mvp: 1,
        hs: 33,
        score: 28,
      },
      {
        playerName: "Someone",
        username: "provolone",
        ping: 6,
        kills: 8,
        assists: 2,
        deaths: 21,
        mvp: 1,
        hs: 0,
        score: 24,
      },
      {
        playerName: "Chris P.",
        username: "Grima Wormtongue",
        ping: 16,
        kills: 9,
        assists: 0,
        deaths: 18,
        mvp: 0,
        hs: 44,
        score: 22,
      },
    ],
  ],
};

test("Good game data is parsed", () => {
  const parsedOutput = parseGame(sampleGame);
  const parsedOutputNoReplay = parseGame(sampleGameNoReplay);
  expect(parsedOutput).toBeTruthy();
  expect(parsedOutputNoReplay).toBeTruthy();
  expect(parsedOutput).toMatchObject(expectedOutput);
  expect(parsedOutputNoReplay).toMatchObject(expectedOutput);
});

test("Bad game data is not parsed", () => {
  const parsedOutput = parseGame("Please break...");
  expect(parsedOutput).toBeFalsy();
});

test("Game with good data is added to database", async () => {
  const freshDB = getFreshDB();
  expect(addGame(freshDB, finalOutput)).toBe(true);
});

test("Game without playerNames is not added to database", async () => {
  const freshDB = getFreshDB();
  expect(addGame(freshDB, expectedOutput)).toBe(false);
});

test("Duplicate games are not allowed", async () => {
  const freshDB = getFreshDB();
  addGame(freshDB, finalOutput);
  expect(gameIsDuplicate(freshDB, finalOutput)).toBe(true);
});

test("Autocompleted names", () => {
  const freshDB = getFreshDB();
  addGame(freshDB, finalOutput);
  expect(autocompleteByAliases(freshDB, expectedOutput)).toMatchObject(
    finalOutput
  );
});
