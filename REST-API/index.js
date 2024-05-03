const express = require("express");
const Sentry = require("@sentry/node");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const sessionRouter = require("./routes/session");
const commentRouter = require("./routes/comment");
const app = express();

require("./config/sentry")(app);
require("./config/express")(app);
require("./config/database")();
require("./config/cloudinary")();

app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/session", sessionRouter);
app.use("/api/comment", commentRouter);

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
