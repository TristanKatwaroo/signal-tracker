// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // Reduced from 1 to 0.1
  enabled: process.env.NODE_ENV === 'production',
  integrations: [], // Remove all integrations
  autoSessionTracking: false,
  debug: false,
});