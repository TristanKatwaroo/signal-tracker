import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

// Retrieve the Cloudflare account hash from the environment variable
const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;

if (!accountHash) {
  throw new Error('NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH environment variable is not defined.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: `/${accountHash}/*`,  // Match only images from this specific account hash
      },
    ],
  },
};

export default nextConfig;