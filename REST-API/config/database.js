const mongoose = require("mongoose");
const Sentry = require("@sentry/node");

module.exports = () => {
  mongoose.connect(
    process.env.DB_URL
  ).then(() =>
    console.log("Successfully connected to DB!")
  )
    .catch((err) => Sentry.captureException(err));
};
