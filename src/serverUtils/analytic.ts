import { env } from 'env';

export const analytic = {
  sentryScript: `<script src='/sentry.js'></script>
<script>  window.Sentry.init({
    dsn: ${JSON.stringify(env.SENTRY_URL)},
    environment: ${JSON.stringify(env.SENTRY_ENV)},
    integrations: [new Sentry.BrowserTracing(), new Sentry.Integrations.CaptureConsole({ levels: ['error'] })],
    tracesSampleRate: 1.0,
    ignoreErrors: ['ACTION_CANCELED'],
  });</script>`,
};
