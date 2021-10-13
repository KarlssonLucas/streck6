const { request, response } = require("express");
const fetch = require("node-fetch");
const { client, hasSession, errorMsg, escape, getUserId } = require("./utils")

const logout = (request, response) => {
    request.session.destroy();
    response.status(200).send(true);
  }
  
//Login user by mail and password matching
const login = (request, response) => {  
    const id = request.body.login;
    const password = request.body.password;
  
    client.query(
      "SELECT * FROM users where login=$1 AND password=$2",
      [id, password],
      (error, result) => {
        if (error) {
          response.status(500).send(errorMsg("Internal server error"));
        }
        else if (result.rows.length === 1) { // SUCCESS LOGIN 
          request.session.isLoggedIn = true;
          request.session.userId = result.rows[0].id;
          request.session.name = result.rows[0].login;
          console.log("SESSION SET")
          response.status(200).send(true);
        }
        else {
          console.log("SESSION DESTROY")
          request.session.destroy();
          response.status(400).send(errorMsg("Wrong credentials"));
        }
      }
    );
  }

  const updatepassword = (request, response) => {
    if (!hasSession(request, response)) return;

      const old = request.body.oldpass;
      const newpass = request.body.newpass;
      const id = parseInt(request.params.id);

      client.query(
      "UPDATE users SET password=$1 WHERE id=$2 AND password=$3", [newpass, id, old], 
       (error, results) => {
           if (error) {
               console.log("hej");
            response.status(500).send(false);
           } else if (results.rowCount === 1) {
            response.status(200).send(true);
        } else {
            response.status(500).send(false);
        }
       } 
      )
  }
  
  const getSession = (request, response) => {
    const session = {
      login: request.session.isLoggedIn === true,
      id: request.session.userId,
      name: request.session.name
    }
    response.status(200).send(session);
  }

const users = (request, response) => {
    if (!hasSession(request, response)) return;
    client.query("SELECT * FROM Users", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const usersById = (request, response) => {
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
    client.query("SELECT * FROM Streckat", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const streckatById = (request, response) => {
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
    client.query("SELECT * FROM Items", (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const totstreck = (request, response) => {
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
    client.query("select * from totstreck LEFT JOIN totskuld ON uid = id ORDER BY sum DESC", [], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const history = (request, response) => {
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
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
    if (!hasSession(request, response)) return;
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
    tots,
    login,
    logout,
    getSession,
    updatepassword
}
