const express = require("express");
const router = express.Router();

router.get('/feed');

router.post('/add');

router.get("/user-posts");

router.put("/post/:id");

router.delete("post/:id");

module.exports = router;