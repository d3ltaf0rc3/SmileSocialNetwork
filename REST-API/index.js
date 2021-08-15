const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const app = express();

require("./config/express")(app);
require("./config/database")();

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});