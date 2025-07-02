import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://6ff8a1d0da00eb3625c6aab1bb52a9ae@o4509597913120768.ingest.us.sentry.io/4509597917184000",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});