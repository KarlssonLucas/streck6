const { request, response } = require("express");
const fetch = require("node-fetch");

if (!process.env.DATABASE_URL) {
  require("dotenv").config();
}

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false,
  },
});

client.connect();

const users = (request, response) => {
    client.query("SELECT * FROM Users", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const usersById = (request, response) => {
    const id = parseInt(request.params.id);
    client.query("SELECT * FROM Users WHERE id = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};


const streckat = (request, response) => {
    client.query("SELECT * FROM Streckat", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const streckatById = (request, response) => {
    if request.params.id
    const id = parseInt(request.params.id);
    client.query("SELECT * FROM Streckat WHERE uid = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const skuldById = (request, response) => {
    const id = parseInt(request.params.id);
    client.query("SELECT * FROM totskuld WHERE uid = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const items = (request, response) => {
    client.query("SELECT * FROM Items", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const totstreck = (request, response) => {
    const id = parseInt(request.params.id);
    client.query("SELECT * FROM totstreck WHERE uid = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

module.exports = {
    users,
    usersById,
    streckat,
    streckatById,
    skuldById,
    items,
    totstreck
}
