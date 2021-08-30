const jwt = require("jsonwebtoken");
const response = require("./responseGenerator");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send(response("fail", "Missing authorization!"));
    }

    const { id } = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).send(response("fail", "User not authenticated!"));
  }
};
