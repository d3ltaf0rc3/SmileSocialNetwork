const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require('cors');
const secret = process.env.SECRET;

module.exports = (app) => {
    app.use(cors());

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(cookieParser(secret));
};