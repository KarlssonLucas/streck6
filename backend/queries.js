const { request, response } = require("express");
const fetch = require("node-fetch");
const { client, hasSession, errorMsg, escape, getUserId } = require("./utils")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
const apisecret = process.env.API_KEY;

const logout = (request, response) => {
    request.session.destroy();
    response.status(200).send(true);
  }
  
//Login user by mail and password matching
const login = (request, response) => { 
    const id = request.body.login.toString().toLowerCase();
    const password = request.body.password;

    client.query(
      "SELECT * FROM users where login=$1",
      [id],
      (error, result) => {
        if (error) {
          response.status(500).send(errorMsg(error));
        } else if (result.rows.length != 1) {
            request.session.destroy();
            response.status(400).send(errorMsg("Wrong credentials"));
            return;
        } 

        bcrypt.compare(password, result.rows[0].password, function(err, res) {
            if (res === true) {
                request.session.isLoggedIn = true;
                request.session.userId = result.rows[0].id;
                request.session.name = result.rows[0].login;
                console.log("SESSION SET")
                response.status(200).send(true);
            } else {
                console.log("SESSION DESTROY")
                request.session.destroy();
                response.status(400).send(errorMsg("Wrong credentials"));
            }
        });
      }
    );
  }

  const updateInventory = (request, response) => {
    if (!hasSession(request, response)) return;

      const id = parseInt(request.params.id);
      const amountToAdd = request.params.amount;

      client.query(
      "UPDATE inventory SET amount = amount + $1 WHERE item=$2", [amountToAdd, id], 
       (error, results) => {
           if (error) {
            response.status(500).send(false);
           } else if (results.rowCount === 1) {
            response.status(200).send(true);
        } else {
            response.status(500).send(false);
        }
       } 
      )
  }

  const getInventory = (request, response) => {
    if (!hasSession(request, response)) return;

      client.query(
      "select item, amount, name, pris, unit from inventory left join items on item = id", [], 
       (error, results) => {
           if (error) {
               response.status(500).send(errorMsg("Internal server error"));
            } else {
                response.status(200).json(results.rows);
            }
       } 
      )
  }

  const updatepassword = (request, response) => {
    if (!hasSession(request, response)) return;

      const old = request.body.oldpass;
      const newpass = request.body.newpass;
      const id = parseInt(request.params.id);

      client.query(
        "SELECT * FROM Users WHERE id=$1", [id], 
         (error, results) => {
             if (error) {
              response.status(500).send(false);
             }

          bcrypt.compare(old, results.rows[0].password, function(err, res) {
            if (res === true) {
                updatePass(newpass, id);
                response.status(200).send(true);
            } else {
                response.status(200).send(false);
            }
        });
         } 
        )
  }

  const updateUser = (request, response) => {
    if (!hasSession(request, response)) return;

    const newuser = request.body.newuser;
    const newpass = request.body.newpass;
    const id = parseInt(request.params.id);

    client.query(
        "SELECT * FROM Users WHERE id=$1", [id], 
         (error, results) => {
             if (error) {
              response.status(500).send(false);
             }

            updatePass(newpass, id);
            updateUsername(newuser, id);
            response.status(200).send(true);
    });
  } 

  const createUser = (request, response) => {
    if (!hasSession(request, response)) return;

    const createuser = request.body.createuser;
    const createpass = request.body.createpass;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(createpass, salt, (err, hash) => {
            client.query(
                "INSERT INTO Users VALUES (DEFAULT, 2, $1, $2)", [createuser, hash], 
                 (error, results) => {
                     if (error) {
                      response.status(500).send(false);
                     }
                    response.status(200).send(true);
            });
        });
    });

  } 

  const updatePass = (newpass, id) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newpass, salt, (err, hash) => {
            client.query(
                "UPDATE users SET password=$1 WHERE id=$2", [hash, id], 
                 (error, results) => {
                     console.log("PASSWORD UPDATED")
                 } 
                )
        });
    });
  }

  const updateUsername = (newuser, id) => {
    client.query(
        "UPDATE users SET login=$1 WHERE id=$2", [newuser, id], 
            (error, results) => {
            console.log("USERNAME UPDATED")
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
    console.log("hej")
    client.query("SELECT * FROM Users", (error, results) => {
        if (error) {
            response.status(500).send(error);
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
    const apikey = request.query.apikey;
    const id = parseInt(request.params.id);

    if (apikey == apisecret || hasSession(request, response)) {
        client.query("SELECT * FROM totskuld WHERE uid = $1", [id], (error, results) => {
            if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
        });
    } else {
        return;
    } 
    
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
    client.query("SELECT * FROM HistoryView WHERE sid = $1 ORDER BY id ASC", [id], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
            response.status(200).json(results.rows);
        }
    });
};


const strecka = (request, response) => {
    const apikey = request.query.apikey;
    const id = parseInt(request.params.userId);
    const item = parseInt(request.params.itemId);
    const amount = parseInt(request.params.amount);

    if (apikey == apisecret || hasSession(request, response)) {
        client.query("INSERT INTO NewStreckat (uid, streck, item) VALUES ($1,$2,$3)", [id, amount, item], (error, results) => {
            if (error) {
                response.status(500).send(errorMsg("Internal server error"));
            } else {
                response.status(200).json(results.rows);
            }
        });
    } else {
        return;
    } 
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
        }
    });

    await client.query("INSERT INTO History (id, time, sid, streck, item) VALUES (DEFAULT, CURRENT_DATE, $1, $2, 99)", [id, paid], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
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
        }
    });

    await client.query("DELETE FROM history WHERE id = $1", [hid], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
        }
    });

    if (itemId === 99) {
        client.query("INSERT INTO betalt (id, sid, paid) VALUES (DEFAULT, $1, -1 * $2)", [userid, amount], (error, results) => {
            if (error) {
                response.status(500).send(errorMsg("Internal server error"));
            } else {
            }
        });
    }
    response.status(200).json({});
};

const createItem = async (request, response) => {
    if (!hasSession(request, response)) return;
    const name = request.body.createName;
    const units = parseInt(request.body.createUnits);
    const pris = parseInt(request.body.createPris);

    await client.query("INSERT INTO ITEMS (id, name, units, pris) VALUES (DEFAULT,$1,$2,$3)", [name, units, pris], (error, results) => {
        if (error) {
            response.status(500).send(errorMsg("Internal server error"));
        } else {
        }
    });
    response.status(200).json(true);
}

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
    updatepassword,
    updateInventory,
    getInventory,
    updateUser,
    createUser,
    createItem
}
