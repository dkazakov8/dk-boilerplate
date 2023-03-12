import { createRouterStore } from 'dk-react-mobx-globals';
import { computed, makeObservable, observable } from 'mobx';

import { routes } from 'routes';

// eslint-disable-next-line import/no-default-export
export default class RouterStore extends createRouterStore({ routes, isClient: IS_CLIENT }) {
  constructor() {
    super();

    makeObservable(this, {
      actionsLogs: observable,
      currentRoute: observable,
      routesHistory: observable,

      previousRoute: computed,
      lastActionsLog: computed,
      previousRoutePathname: computed,
    });
  }
}
