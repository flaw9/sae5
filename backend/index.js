require('dotenv').config();
const express = require('express');
const bodyParder = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

// App

app.use(cookieParser());
app.use(bodyParder.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        httpOnly: false,
    }
}));

// Routes

app.use('/auth', require('./routes/auth.js'));

/// Auth middleware

app.use(function (req, res, next) {
    if (req.url.startsWith('/auth')) return next(); // By-pass auth routes
    if (!req.session) return res.status(500).send('Session not found');
    else if (!req.session.user) return res.status(401).send('Not logged in');
    else next();
});

// API

app.use('/api', require('./routes/api.js'));

// Error handling

app.on("error", (err) => {
    console.log(`${err}`);
});

process.on("uncaughtException", (err) => {
    console.log(`Uncaught exception: ${err.message ?? err}`);
});

// 404

app.use(function (req, res, next) {
    return res.send('404: Not found.');
});

// Running the server

const port = process.env.PORT ?? 3000;
app.listen(port, async () => {
    console.log(`Server started on port ${port}`);
});