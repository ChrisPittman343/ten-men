-- An instance of a 10 man, consisting of 2 teams of 5 (duh)
CREATE TABLE IF NOT EXISTS Matches (
    matchID INT PRIMARY KEY,
    datePlayed INT NOT NULL,
    map TEXT NOT NULL,
    duration INT NOT NULL
);

-- A team of 5 players attached to a match
CREATE TABLE IF NOT EXISTS Teams (
    matchID INT,
    teamID INT,
    score INT NOT NULL,
    CONSTRAINT Match_FK FOREIGN KEY (matchID) REFERENCES Matches(matchID),
    PRIMARY KEY (matchID, teamID)
);

-- 
CREATE TABLE IF NOT EXISTS TeamMembers (
    teamID INT,
    playerName TEXT,
    username TEXT NOT NULL,
    ping INT NOT NULL,
    kills INT NOT NULL,
    assists INT NOT NULL,
    deaths INT NOT NULL,
    mvp INT NOT NULL,
    hs INT NOT NULL,
    score INT NOT NULL,
    CONSTRAINT Team_FK FOREIGN KEY (teamID) REFERENCES Teams(teamID),
    PRIMARY KEY (teamID, playerName)
);

-- All the usernames a player has been seen as
-- Used to help with auto-complete for admins
CREATE TABLE IF NOT EXISTS PlayerAliases (
    playerName TEXT PRIMARY KEY,
    alias TEXT,
    CONSTRAINT Player_FK FOREIGN KEY (playerName) REFERENCES TeamMembers(playerName)
);