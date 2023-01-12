DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Items CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;
DROP TABLE IF EXISTS Strecklist CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Betalt CASCADE;
DROP TABLE IF EXISTS Skuld CASCADE;

CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    units NUMERIC NOT NULL,
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

CREATE TABLE History (
    id SERIAL PRIMARY KEY,
    time DATE  NOT NULL,
    sid INT REFERENCES Users(id) NOT NULL,
    streck INT NOT NULL,
    item INT NOT NULL
);

CREATE TABLE betalt (
    id SERIAL PRIMARY KEY,
    sid INT REFERENCES Users(id) NOT NULL,
    paid INT NOT NULL
);

CREATE TABLE Skuld (
    sid INT REFERENCES Users(id), 
    paid INT NOT NULL,
    owed INT NOT NULL
);

CREATE TABLE Inventory (
    item INT REFERENCES Items(id),
    amount INT DEFAULT 0,
    unit TEXT NOT NULL,
    PRIMARY KEY (item)
);
