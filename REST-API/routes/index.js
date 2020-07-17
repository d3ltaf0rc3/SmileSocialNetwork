const express = require("express");
const router = express.Router();

router.post('/register');

router.post('/login');

router.post('/logout');

router.put('/user/:id');

module.exports = router;