CREATE TABLE IF NOT EXISTS matches (
    matchID SMALLSERIAL,
    map VARCHAR(16) NOT NULL,
    datePlayed BIGINT NOT NULL,
    duration SMALLINT NOT NULL,
    CONSTRAINT matches_pkey PRIMARY KEY (matchID)
);

CREATE TABLE IF NOT EXISTS teams (
    matchID SMALLINT,
    teamID SMALLSERIAL,
    roundsWon SMALLINT NOT NULL,
    CONSTRAINT teamID_Unique UNIQUE (teamID) INCLUDE(teamID),
    CONSTRAINT teams_matches_fk FOREIGN KEY (matchID) REFERENCES matches (matchID) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (matchID, teamID)
);

CREATE TABLE IF NOT EXISTS teammembers (
    teamID SMALLINT,
    playerName VARCHAR(32),
    ping SMALLINT NOT NULL,
    kills SMALLINT NOT NULL,
    assists SMALLINT NOT NULL,
    deaths SMALLINT NOT NULL,
    hs SMALLINT NOT NULL DEFAULT 0,
    mvp SMALLINT NOT NULL DEFAULT 0,
    score SMALLINT NOT NULL,
    username VARCHAR(32) NOT NULL,
    CONSTRAINT teammembers_teams_fk FOREIGN KEY (teamID) REFERENCES teams (teamID) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (teamID, playerName)
);

CREATE TABLE IF NOT EXISTS playericons (
    playerName VARCHAR(32) NOT NULL,
    src VARCHAR(1024) NOT NULL,
    PRIMARY KEY (playerName)
);