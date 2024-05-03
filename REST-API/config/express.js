const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.disable("x-powered-by");
  app.use(cors({ allowedHeaders: "Authorization", origin: process.env.APP_URL, methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'DELETE'] }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((_, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
  })
};
