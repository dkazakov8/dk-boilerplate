import { runInAction } from 'mobx';

import { TypeAction } from 'models';
import { promiseDelay } from 'utils';

const DELAY = 1000;

export const handleIncrease: TypeAction = ({ store }) => {
  return Promise.resolve()
    .then(() => promiseDelay(DELAY))
    .then(() => {
      runInAction(() => {
        store.counter.globalCounter += 1;
      });
    });
};
