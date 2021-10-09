const jwt = require("jsonwebtoken");
const Sentry = require("@sentry/node");
const User = require("../models/User");
const Session = require("../models/Session");
const response = require("../utils/responseGenerator");
const deleteSensitiveData = require("../utils/deleteSensitiveData");

async function verifySession(req, res) {
  if (!req.headers.authorization || req.headers.authorization === 'null') {
    return res.status(401).send(response("fail", "Missing authorization"));
  }

  try {
    const { id } = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    const user = await User.findById(id);

    const userToSend = deleteSensitiveData(user);
    return res.send(response("success", userToSend));
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  verifySession,
}