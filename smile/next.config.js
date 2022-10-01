const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
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
