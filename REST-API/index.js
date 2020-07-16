const express = require("express");
const connectToDB  = require("./config/database");
const expressConfig = require("./config/express");
const app = express();
const PORT = 7777;

expressConfig(app);
connectToDB();

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`);
});