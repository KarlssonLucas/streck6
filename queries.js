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
    client.query("SELECT * FROM totstreck WHERE id = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const tots = (request, response) => {
    client.query("select * from totstreck ORDER BY sum DESC", [], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const history = (request, response) => {
    const id = parseInt(request.params.id);
    client.query("SELECT * FROM HistoryView WHERE sid = $1", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};


const strecka = (request, response) => {
    const id = parseInt(request.params.userId);
    const item = parseInt(request.params.itemId);
    const amount = parseInt(request.params.amount);
    client.query("INSERT INTO NewStreckat (uid, streck, item) VALUES ($1,$2,$3)", [id, amount, item], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            console.log(results)
            response.status(200).json(results.rows);
        }
    });
};

const pay = async (request, response) => {
    const id = parseInt(request.params.id);
    const paid = parseInt(request.params.paid);
    const paidText = request.params.paid+"kr";
    
    await client.query("INSERT INTO Betalt (id, sid, paid) VALUES (DEFAULT,$1,$2)", [id, paid], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            console.log(results)
        }
    });

    await client.query("INSERT INTO History (id, time, sid, streck, item) VALUES (DEFAULT, CURRENT_DATE, $1, $2, 99)", [id, paid], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            console.log(results)
            response.status(200).json(results.rows);
        }
    });

};

const remove = async (request, response) => {
    const userid = parseInt(request.params.id);
    const hid = parseInt(request.params.hid);
    const itemId = parseInt(request.params.itemid);
    const amount = parseInt(request.params.amount);

    const res = {};

    await client.query("UPDATE strecklist SET streck=streck-$1 WHERE sid=$2 AND item=$3", [amount,userid,itemId], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            console.log(results)
        }
    });

    await client.query("DELETE FROM history WHERE id = $1", [hid], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            console.log(results);
        }
    });

    if (itemId === 99) {
        client.query("INSERT INTO betalt (id, sid, paid) VALUES (DEFAULT, $1, -1 * $2)", [userid, amount], (error, results) => {
            if (error) {
                response.status(500).send(errorMsg("Internal server error"));
            } else {
                console.log(results)
            }
        });
    }
    response.status(200).json({});
};

module.exports = {
    users,
    usersById,
    streckat,
    streckatById,
    skuldById,
    items,
    totstreck,
    history,
    strecka,
    pay,
    remove,
    tots
}
