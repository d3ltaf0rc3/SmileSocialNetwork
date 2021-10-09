const express = require("express");
const { verifySession } = require("../controllers/session");
const router = express.Router();

router.get("/verify", verifySession);

module.exports = router;