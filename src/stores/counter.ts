import { makeAutoObservable } from 'mobx';

// eslint-disable-next-line import/no-default-export
export default class StoreCounter {
  constructor() {
    makeAutoObservable(this);
  }

  globalCounter = 0;
}
