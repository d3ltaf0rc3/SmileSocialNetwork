const jwt = require("jsonwebtoken");
const Sentry = require("@sentry/node");
const Session = require("../models/Session");
const User = require("../models/User");
const response = require("./responseGenerator");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization === "null") {
    return res.status(401).send(response("fail", "Missing authorization!"));
  }

  try {
    const { id } = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    const session = await Session.findOne({ token: req.headers.authorization });

    if (session === null) {
      return res.status(401).send(response("fail", "Session does not exist!"));
    } else if (new Date() >= new Date(session.expiresAt)) {
      await User.findByIdAndUpdate(id, { $pull: { sessions: session.id } });
      await Session.findByIdAndDelete(session.id);
      return res.status(401).send(response("fail", "Session has expired!"));
    }

    req.userId = id;
    req.sessionId = session.id;
    next();
  } catch (error) {
    Sentry.captureException(error);
    return res.status(401).send(response("fail", "User not authenticated!"));
  }
};
