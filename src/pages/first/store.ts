import { transformers } from 'compSystem/transformers';

// eslint-disable-next-line import/no-default-export
export default class Store {
  constructor() {
    transformers.classToObservable(this);
  }

  modularCounter = 0;
}
