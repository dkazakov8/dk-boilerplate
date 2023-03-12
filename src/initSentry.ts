import { init } from '@sentry/node';
import '@sentry/tracing';
import { CaptureConsole } from '@sentry/integrations';
import { errorActionCanceledName } from 'dk-react-mobx-globals';

import { env } from 'env';

export function initSentry() {
  if (env.SENTRY_URL) {
    init({
      dsn: env.SENTRY_URL,
      environment: `node-${env.SENTRY_ENV}`,
      integrations: [new CaptureConsole({ levels: ['error'] })],
      tracesSampleRate: 1.0,
      ignoreErrors: [errorActionCanceledName],
    });
  }
}
