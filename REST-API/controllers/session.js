const jwt = require("jsonwebtoken");
const Sentry = require("@sentry/node");
const User = require("../models/User");
const Session = require("../models/Session");
const response = require("../utils/responseGenerator");
const deleteSensitiveData = require("../utils/deleteSensitiveData");

async function verifySession(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send(response("fail", "Missing authorization!"));
  }

  const authHeader = req.headers.authorization.split(" ");

  if (authHeader.length !== 2) {
    return res.status(400).send(response("fail", "Invalid authorization header format!"));
  } else if (authHeader[0] !== 'Bearer') {
    return res.status(400).send(response("fail", "Unsupported auth format!"));
  } else if (!authHeader[1] || authHeader[1] === "null") {
    return res.status(400).send(response("fail", "Missing authorization!"));
  }
  const token = authHeader[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const session = await Session.findOne({ token });

    if (session === null) {
      return res.status(401).send(response("fail", "Session does not exist!"));
    } else if (new Date() >= new Date(session.expiresAt)) {
      await User.findByIdAndUpdate(id, { $pull: { sessions: session.id } });
      await Session.findByIdAndDelete(session.id);
      return res.status(401).send(response("fail", "Session has expired!"));
    }

    const user = await User.findById(id);

    const userToSend = deleteSensitiveData(user);
    return res.send(response("success", userToSend));
  } catch (error) {
    if (error.message === "invalid signature" || error.message === "jwt malformed") {
      return res.status(401).send(response("fail", "Malformed JWT token!"))
    }
    Sentry.captureException(error);
    res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  verifySession,
}