import { runInAction } from 'mobx';

import { system } from 'const';
import { TypeAction } from 'models';

export const modalRemove: TypeAction = ({ store }) => {
  const modal = store.ui.modal;

  if (!modal || modal.isLeaving) return Promise.resolve();

  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    runInAction(() => {
      modal.isLeaving = true;
    });

    return setTimeout(() => {
      const params = store.ui.modal?.params;

      runInAction(() => (store.ui.modal = undefined));

      if (modal.onClose && !modal.preventOnClose) modal.onClose(params);

      resolve();
    }, system.MODALS_LEAVING_TIMEOUT);
  });
};
