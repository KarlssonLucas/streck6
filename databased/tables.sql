DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Items CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;
DROP TABLE IF EXISTS Strecklist CASCADE;

CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    pris INT NOT NULL
);

CREATE TABLE Roles (
    id INT PRIMARY KEY,
    role TEXT NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    roleid INT REFERENCES Roles(id),
    login TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Strecklist (
    sid INT REFERENCES Users(id),
    streck INT NOT NULL,
    item INT NOT NULL REFERENCES Items(id),
    PRIMARY KEY (sid, item)
);

CREATE TABLE Skuld (
    sid INT REFERENCES Users(id),
    paid INT NOT NULL,
    owed INT NOT NULL
)
