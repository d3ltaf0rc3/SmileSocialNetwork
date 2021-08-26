const jwt = require("jsonwebtoken");
const response = require("./responseGenerator");

module.exports = (req, res, next) => {
  try {
    if (!req.cookies["auth-token"]) {
      return res.status(401).send(response("fail", "Missing auth cookie!"));
    }

    const id = jwt.verify(req.cookies["auth-token"], process.env.JWT_KEY);
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).send(response("fail", "User not authenticated!"));
  }
};
