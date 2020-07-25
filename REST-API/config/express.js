const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require('cors');
const secret = process.env.SECRET;

module.exports = (app) => {
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(cookieParser(secret));
};