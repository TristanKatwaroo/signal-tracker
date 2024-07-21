import { withSentryConfig } from '@sentry/nextjs';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Optimize client-side bundles
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              return crypto
                .createHash('sha1')
                .update(
                  chunks.reduce((acc, chunk) => acc + chunk.name, '')
                )
                .digest('hex') + (dev ? '-dev' : '-prod');
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };

      // Remove the problematic optimization.usedExports
      // config.optimization.usedExports = true;

      if (!dev) {
        config.optimization.minimize = true;
        // Make sure TerserPlugin is imported if you're using it
        // const TerserPlugin = require('terser-webpack-plugin');
        // config.optimization.minimizer.push(
        //   new TerserPlugin({
        //     terserOptions: {
        //       compress: {
        //         drop_console: true,
        //       },
        //       mangle: true,
        //     },
        //   })
        // );
      }
    }

    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  // Sentry options here
};

// Only use Sentry in production
export default process.env.NODE_ENV === 'production'
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;