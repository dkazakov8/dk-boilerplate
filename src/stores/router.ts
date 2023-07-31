import { findRouteByPathname } from 'dk-react-mobx-router';

import { transformers } from 'compSystem/transformers';
import { routes } from 'routes';

// eslint-disable-next-line import/no-default-export
export default class RouterStore {
  constructor() {
    transformers.classToObservable(this);
  }

  routesHistory: Array<string> = [];
  currentRoute: Omit<(typeof routes)[keyof typeof routes], 'loader' | 'component'> = {} as any;

  get previousRoutePathname() {
    return this.routesHistory[this.routesHistory.length - 2];
  }

  get previousRoute() {
    if (!this.previousRoutePathname) return null;

    return findRouteByPathname({ pathname: this.previousRoutePathname, routes });
  }
}
