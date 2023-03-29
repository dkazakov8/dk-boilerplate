import {
  action,
  autorun,
  observable,
  runInAction,
  toJS,
  makeAutoObservable,
  computed,
  makeObservable,
} from 'mobx';

export const transformers = {
  toJS,
  batch: runInAction,
  action,
  autorun,
  computed,
  observable,
  classToObservable: makeAutoObservable,
  classToObservableManual: makeObservable,
};
