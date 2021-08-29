const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.disable("x-powered-by");
  app.use(cors({ allowedHeaders: "Authorization", origin: process.env.APP_URL }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
