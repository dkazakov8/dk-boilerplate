import { action, autorun, observable, runInAction } from 'mobx';

export const transformers = { action, batch: runInAction, autorun, observable };
