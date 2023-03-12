import { makeAutoObservable } from 'mobx';

// eslint-disable-next-line import/no-default-export
export default class Store {
  constructor() {
    makeAutoObservable(this);
  }

  test = 1;
}
