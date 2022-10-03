const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  sentry: {
    hideSourceMaps: true,
    autoInstrumentServerFunctions: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
