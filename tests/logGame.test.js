const parseGame = require("../util/parseGame");

test("Server recieves data properly", () => {});

test("Good data is parsed correctly", () => {
  const sampleGame = `Grima Wormtongue
    Wallet ($3.37)
    Notifications 0
    Store
    Community
    You & Friends
    Support
    Account details
    Preferences
    Change language
    Change User
    View desktop website
    
    © Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries. #footer_privacy_policy  |  #footer_legal  |  #footer_ssa  |  #footer_refunds
    STORECOMMUNITYGRIMA WORMTONGUECHATSUPPORTInstall Steam  Grima Wormtongue
    $3.37
     
    
    Grima Wormtongue » Games » Counter-Strike: Global Offensive - Personal Game Data
    
    Only you and nobody else can browse your personal game data.
    Return to Grima Wormtongue's profile
    
    Account InformationPrime AccountLatencyMatchmakingCompetitive MatchesScrimmage MatchesWingman MatchesOperation Hydra MatchesMatch StatsMatch EventsCasual MatchesOperation Mission PartnersOperation ProgressCommendationsReportsMajor Pick'EmFavorite EventsLeaderboardsLoadoutAuthentication Codes
     
    Map	Match Results
    
    Competitive Dust II
    2022-05-10 02:20:56 GMT
    Wait Time: 00:28
    Match Duration: 42:51
    Download GOTV Replay
    
    
    Player Name	Ping	K	A	D	★	HSP	Score
    
    オバマ氏 Jort
    29	21	5	13	★4	19%	57
    
    Echoriver
    42	24	5	11	★4	50%	56
    
    Nik
    61	16	2	10	★5	31%	46
    
    _cosmic_dolphin_(gamer)
    14	20	3	12	★2	45%	44
    
    Cawmoo
    74	11	2	13	★	27%	30
    16 : 7
    
    BarnacleMan
    28	20	4	16	★3	60%	57
    
    Photorealistic B1GJOK3
    16	13	3	18	★2	38%	34
    
    QCMBR
    10	9	4	19	★	33%	28
    
    provolone
    6	8	2	21	★	25%	24
    
    Grima Wormtongue
    16	9	0	18	 	44%	22`;
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
          hs: 19,
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
          mvp: 1,
          hs: 27,
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
          hs: 25,
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

  const parsedOutput = parseGame(sampleGame);
  expect(parsedOutput).toBeTruthy();
  expect(parsedOutput).toMatchObject(expectedOutput);
});

test("Bad data is falsy", () => {
  const parsedOutput = parseGame("Please break...");
  expect(parsedOutput).toBeFalsy();
});
