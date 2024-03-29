const express = require('express')
var session = require('express-session')
const path = require('path')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60*60*1000*3 }}) // Inloggad max 3 timmar
)

app.post('/api/login', db.login)
app.post('/api/updatepassword/:id', db.updatepassword)
app.post('/api/updateuser/:id', db.updateUser)
app.post('/api/createuser', db.createUser)
app.post('/api/createitem', db.createItem)
app.get('/api/updateInventory/:id/:amount', db.updateInventory)
app.get('/api/inventory', db.getInventory)
app.get('/api/session', db.getSession)
app.get('/api/logout', db.logout)
app.get('/api/strecka/:userId/:itemId/:amount', db.strecka)
app.get('/api/pay/:id/:paid', db.pay)
app.get('/api/remove/:id/:hid/:itemid/:amount', db.remove)
app.get('/api/history/:id', db.history)
app.get('/api/users', db.users)
app.get('/api/users/:id', db.usersById)
app.get('/api/streck', db.streckat)
app.get('/api/streck/:id', db.streckatById)
app.get('/api/items', db.items)
app.get('/api/skuld/:id', db.skuldById)
app.get('/api/totstreck/:id', db.totstreck)
app.get('/api/tot', db.tots)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./strecklista/build"));
}

app.get("*", function (req, res) {
  res.status(200).send("API")
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
