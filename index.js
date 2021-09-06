const express = require('express')

const app = express()
const db = require('./queries')
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/api/users', db.users)
app.get('/api/users/:id', db.usersById)
app.get('/api/streck', db.streckat)
app.get('/api/streck/:id', db.streckatById)
app.get('/api/items', db.items)
app.get('/api/skuld/:id', db.skuldById)
app.get('/api/totstreck/:id', db.totstreck)

app.use(express.static('strecklista/build'));

app.get('/*', (request, response) => {
    response.redirect('/');
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
