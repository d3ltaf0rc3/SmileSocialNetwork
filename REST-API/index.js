const express = require("express");
const connectToDB  = require("./config/database");
const expressConfig = require("./config/express");
const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const app = express();

expressConfig(app);
connectToDB();

app.use("/api", indexRouter);
app.use("/api/posts", postRouter);

app.listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`Server is running on port ${process.env.PORT}`);
});