import { createRouterStore } from 'dk-react-mobx-globals';

import { transformers } from 'compSystem/transformers';
import { routes } from 'routes';

// eslint-disable-next-line import/no-default-export
export default class RouterStore extends createRouterStore({ routes, isClient: IS_CLIENT }) {
  constructor() {
    super();

    transformers.classToObservableManual(this, {
      actionsLogs: transformers.observable,
      currentRoute: transformers.observable,
      routesHistory: transformers.observable,

      previousRoute: transformers.computed,
      lastActionsLog: transformers.computed,
      previousRoutePathname: transformers.computed,
    });
  }
}
