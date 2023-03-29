import { transformers } from 'compSystem/transformers';

// eslint-disable-next-line import/no-default-export
export default class StoreCounter {
  constructor() {
    transformers.classToObservable(this);
  }

  globalCounter = 0;
}
