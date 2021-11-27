const jwt = require("jsonwebtoken");
const Sentry = require("@sentry/node");
const Session = require("../models/Session");
const User = require("../models/User");
const response = require("./responseGenerator");

module.exports = async (req, res, next) => {
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
      return res.status(401).send(response("fail", "Invalid session!"));
    } else if (new Date() >= new Date(session.expiresAt)) {
      await User.findByIdAndUpdate(id, { $pull: { sessions: session.id } });
      await Session.findByIdAndDelete(session.id);
      return res.status(401).send(response("fail", "Invalid session!"));
    }

    req.userId = id;
    req.sessionId = session.id;
    next();
  } catch (error) {
    if (error.message === "invalid signature" || error.message === "jwt malformed") {
      return res.status(401).send(response("fail", "Malformed JWT token!"))
    }
    Sentry.captureException(error);
    return res.status(401).send(response("fail", "Unauthorized!"));
  }
};
