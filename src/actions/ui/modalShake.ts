import { runInAction } from 'mobx';

import { system } from 'const';
import { TypeAction } from 'models';

export const modalShake: TypeAction = ({ store }) => {
  const modal = store.ui.modal;

  if (!modal || modal.isShaking) return Promise.resolve();

  return new Promise((resolve) => {
    runInAction(() => (modal.isShaking = true));

    return setTimeout(() => {
      runInAction(() => {
        if (store.ui.modal) store.ui.modal.isShaking = false;
      });

      resolve();
    }, system.MODALS_SHAKING_TIMEOUT);
  });
};
