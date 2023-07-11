/* eslint-disable react/no-set-state, @typescript-eslint/naming-convention */

import { ReactElement } from 'react';
import { getPlainActions, unescapeAllStrings } from 'dk-react-mobx-globals';
import { restoreState } from 'dk-mobx-restore-state';

import { routes, TypeRouteValues } from 'routes';
import { appendAutorun, getTypedEntries, getTypedKeys, history } from 'utils';
import { env } from 'env';
import { TypeGlobals } from 'models';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

const modularStorePath = 'pages' as const;
const logs = env.LOGS_STORE_SETTER;
const logsCanceledActions = env.LOGS_CANCELED_ACTIONS;
const initialData = IS_CLIENT ? window.INITIAL_DATA || {} : {};

export class Router extends ConnectedComponent<{}, TypeRouteValues> {
  localState: {
    loadedComponentName?: keyof typeof routes;
  } = transformers.observable({
    loadedComponentName: undefined,
  });

  loadedComponent?: ReactElement;

  UNSAFE_componentWillMount() {
    this.clearPages();
    this.redirectOnHistoryPop();
    appendAutorun(this, this.setLoadedComponent);
  }

  log = (message: string) => {
    const logsPrefix = '%c[Router]%c';

    if (logs) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: initial']);
    }
  };

  clearPages = () => {
    this.context.store[modularStorePath] = {} as any;
    this.context.actions[modularStorePath] = {} as any;

    this.log(
      `"store.${modularStorePath}" and "actions.${modularStorePath}" have been set to empty objects`
    );
  };

  logCanceled = (message: string) => {
    const logsPrefix = '%c[Router] %c[canceled]%c';

    if (logsCanceledActions) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: red', 'color: initial']);
    }
  };

  cancelExecutingApi = () => {
    const apiExecuting = Object.values(this.context.api).filter((apiFn) => apiFn.state.isExecuting);

    if (apiExecuting.length) {
      transformers.batch(() => {
        apiExecuting.forEach((apiFn) => {
          apiFn.state.isCancelled = true;
        });
      });

      this.logCanceled(apiExecuting.map((apiFn) => `api.${apiFn.name}`).join(', '));
    }
  };

  cancelExecutingActions = () => {
    const pagesObject = this.context.actions[modularStorePath];

    const moduleActionsExecuting = getPlainActions(pagesObject as any).filter(
      (actionFn) => actionFn.state.isExecuting
    );

    if (moduleActionsExecuting.length) {
      transformers.batch(() => {
        moduleActionsExecuting.forEach((actionFn) => {
          actionFn.state.isCancelled = true;
        });
      });

      this.logCanceled(moduleActionsExecuting.map((actionFn) => `${actionFn.name}`).join(', '));
    }
  };

  redirectOnHistoryPop = () => {
    const { actions, store } = this.context;

    if (!history) return;

    history.listen((params) => {
      if (params.action !== 'POP') return;

      if (store.router.previousRoutePathname === params.location.pathname) {
        transformers.batch(() => store.router.routesHistory.pop());
      }

      void actions.routing.redirectTo({ noHistoryPush: true, pathname: history.location.pathname });
    });
  };

  setLoadedComponent = () => {
    const { loadedComponentName } = this.localState;
    const { actions, store } = this.context;

    const currentRouteName = store.router.currentRoute.name;

    if (actions.routing.redirectTo.state.isExecuting || loadedComponentName === currentRouteName) {
      return;
    }

    if (!loadedComponentName) {
      this.setComponent(currentRouteName);
    } else {
      if (IS_CLIENT) {
        this.cancelExecutingApi();
        this.cancelExecutingActions();
      }
      this.clearPages();

      this.setComponent(currentRouteName);
    }
  };

  extendStores = (stores: Partial<TypeGlobals['store'][typeof modularStorePath]>) => {
    const { store } = this.context;

    if (!stores) return;

    const pagesObject = store[modularStorePath];
    const initialPagesData = initialData[modularStorePath];

    getTypedKeys(stores).forEach((storeName) => {
      if (pagesObject[storeName]) return;

      /**
       * Client should recreate dynamic stores with initial data passed from server,
       * because SSR does not serialize get() & set() statements
       *
       */

      // @ts-ignore
      pagesObject[storeName] = new stores[storeName]!();

      this.log(`store has been extended with "store.${modularStorePath}.${storeName}"`);

      if (initialPagesData) {
        const storeInitialData = initialPagesData[storeName];

        if (storeInitialData) {
          restoreState({
            logs: env.LOGS_RESTORE_INITIAL,
            target: pagesObject[storeName],
            source: unescapeAllStrings(storeInitialData),
            transformers,
          });

          this.log(
            `data for "store.${modularStorePath}.${storeName}" has been restored from initial object`
          );
        }

        /**
         * Delete from variable for clear SPA experience on navigation (back/forward)
         * so when user comes back to the first loaded page he won't see too old data
         *
         */

        delete initialData[modularStorePath];

        this.log(`"${modularStorePath}" has been deleted from initial object`);
      }
    });
  };

  extendActions = (actions: Partial<TypeGlobals['actions'][typeof modularStorePath]>) => {
    if (!actions) return;

    /**
     * When actions are mocked during SSR no need to waste time on wrapping
     *
     */

    const pagesObject = this.context.actions[modularStorePath];

    getTypedKeys(actions).forEach((actionGroupName) => {
      if (pagesObject[actionGroupName]) return;

      const actionGroup = actions[actionGroupName]!;

      pagesObject[actionGroupName] = getTypedEntries(actionGroup).reduce(
        // @ts-ignore
        (acc, [actionName, fn]) => {
          acc[actionName] = this.context.createWrappedAction(fn);

          return acc;
        },
        {} as any
      );

      this.log(`actions have been extended with "actions.${modularStorePath}.${actionGroupName}"`);
    });
  };

  setComponent = (currentRouteName: keyof typeof routes) => {
    const componentConfig = routes[currentRouteName];
    const props = 'props' in componentConfig ? componentConfig.props : {};
    const RouteComponent: any = IS_CLIENT ? componentConfig.component : componentConfig.loader;

    if (componentConfig.store) {
      this.extendStores({ [componentConfig.pageName]: componentConfig.store });
    }
    if (componentConfig.actions) {
      this.extendActions({ [componentConfig.pageName]: componentConfig.actions });
    }

    transformers.batch(() => {
      this.localState.loadedComponentName = currentRouteName;
      this.loadedComponent = <RouteComponent {...props} />;
    });
  };

  render() {
    return this.localState.loadedComponentName ? this.loadedComponent : null;
  }
}
