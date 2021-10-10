function errorMsg(text) {
    return { error: text };
}

function escape(input, match) {

    if (match.includes(input.toLowerCase())) {
        return true;
    }
    return false;
}

function getUserId(request) {
    return parseInt(request.session.userId);
}

function hasSession(request, response) {
    if (request.session.isLoggedIn && request.session.isLoggedIn == true) {
        return true;
    }
    else {
        console.log("NOT LOGGED IN")
        response.status(400).json(errorMsg("No session. Please log in."));
        return false;
    }
}

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

module.exports = {
    hasSession,
    escape,
    errorMsg,
    getUserId,
    client
}