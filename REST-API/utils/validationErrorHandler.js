const { validationResult } = require("express-validator");
const response = require("./responseGenerator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }
  next();
};
