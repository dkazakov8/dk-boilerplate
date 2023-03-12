import { runInAction } from 'mobx';

import { system } from 'const';
import { TypeAction } from 'models';

type TypeParams = {
  isConfirmed: boolean;
};

export const confirmRemove: TypeAction<TypeParams> = ({ store }, { isConfirmed }) => {
  const confirm = store.ui.confirm;

  if (!confirm) return Promise.resolve();

  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    if (confirm.isEntering) {
      runInAction(() => {
        confirm.isLeaving = true;
        confirm.isEntering = false;
      });

      return setTimeout(() => {
        runInAction(() => {
          store.ui.confirm = undefined;
        });

        if (isConfirmed) {
          confirm.onConfirm?.();
        } else {
          confirm.onReject?.();
        }

        resolve();
      }, system.MODALS_LEAVING_TIMEOUT);
    }

    resolve();
  });
};
