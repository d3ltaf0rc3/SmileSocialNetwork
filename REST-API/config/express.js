const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const secret = process.env.SECRET;

module.exports = (app) => {
  app.disable("x-powered-by");
  app.use(cors({ credentials: true, origin: process.env.APP_URL }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser(secret));
};
