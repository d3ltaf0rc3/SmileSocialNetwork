const express = require("express");
const cloudinary = require("cloudinary");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const sessionRouter = require("./routes/session");
const commentRouter = require("./routes/comment");
const app = express();

Sentry.init({
  environment: process.env.NODE_ENV === "production" ? "production" : "development",
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

require("./config/express")(app);
require("./config/database")();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/session", sessionRouter);
app.use("/api/comment", commentRouter);

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
