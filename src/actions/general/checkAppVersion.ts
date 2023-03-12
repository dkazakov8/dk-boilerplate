import { TypeAction } from 'models';
import { env } from 'env';
import { serverRoutes } from 'const';

import { messages } from './messages';

const REQ_TIMEOUT_SECONDS = 20;
const SECOND = 1000;

export const checkAppVersion: TypeAction = ({ actions, getLn }) => {
  if (env.NODE_ENV === 'development') return Promise.resolve();

  const interval = setInterval(() => {
    void fetch(serverRoutes.getAppVersion)
      .then((response) => response.json())
      .then((data: { GIT_COMMIT: string }) => {
        if (data.GIT_COMMIT !== env.GIT_COMMIT) {
          void actions.ui.confirmRaise({
            title: getLn(messages.notificationUpdateApp),
            hideRejectButton: true,
            confirmText: getLn(messages.notificationUpdateAppConfirm),
            onConfirm: () => window.location.reload(),
            restrictCloseOnBackdrop: true,
          });

          clearInterval(interval);
        }
      })
      .catch((error) => {
        // No need to show this system error to client
        console.error(error);
      });
  }, REQ_TIMEOUT_SECONDS * SECOND);

  return Promise.resolve();
};
