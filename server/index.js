//libs
require('dotenv').config();
const express = require ('express');
const massive = require('massive');
const session = require('express-session');
//controllers
const {register, login} = require('./controller')

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database Connected');
})

app.post('/auth/register', register)
app.post('/auth/login', login);
app.get('/api/user', function(req, res) {
    if(req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(404).json({
            error: "USER_NOT_FOUND"
        })
    }
})

app.listen(5050, () => console.log('Listening on Port 5050'));