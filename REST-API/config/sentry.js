const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

module.exports = (app) => {
  Sentry.init({
    environment: process.env.NODE_ENV ?? 'development',
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      nodeProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0
  })

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}