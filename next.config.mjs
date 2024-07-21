import { withSentryConfig } from '@sentry/nextjs';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }

    // Enable tree shaking and dead code elimination
    // config.optimization.usedExports = true;

    if (!dev) {
      // Enable full optimization in production
      config.optimization.minimize = true;
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  org: "tempest-interactive",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  // New options to reduce bundle size
  include: './dist',
  ignoreFile: '.sentrycliignore',
  ignore: ['node_modules', 'webpack.config.js'],
  configFile: 'sentry.properties',
  stripPrefix: ['dist/'],
  urlPrefix: '~/_next',
  // Enable tree-shaking for Sentry
  release: process.env.SENTRY_RELEASE,
  cleanArtifacts: true,
};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);