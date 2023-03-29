import { transformers } from 'compSystem/transformers';
import { TypeAction } from 'models';
import { promiseDelay } from 'utils';

const DELAY = 1000;

export const handleIncrease: TypeAction = ({ store }) => {
  return Promise.resolve()
    .then(() => promiseDelay(DELAY))
    .then(() => {
      transformers.batch(() => {
        store.pages.second.modularCounter += 1;
      });
    });
};
