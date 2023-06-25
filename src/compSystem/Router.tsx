/* eslint-disable react/no-set-state, @typescript-eslint/naming-convention */

import { ReactElement } from 'react';
import { getPlainActions } from 'dk-react-mobx-globals';

import { routes, TypeRouteValues } from 'routes';
import { appendAutorun, history } from 'utils';
import { env } from 'env';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

const modularStorePath = 'pages' as const;
const logs = env.LOGS_STORE_SETTER;
const logsCanceledActions = env.LOGS_CANCELED_ACTIONS;

export class Router extends ConnectedComponent<{}, TypeRouteValues> {
  state: {
    loadedComponent?: ReactElement;
    loadedComponentName?: keyof typeof routes;
  } = {
    loadedComponent: undefined,
    loadedComponentName: undefined,
  };

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
    const { loadedComponentName } = this.state;
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

  setComponent = (currentRouteName: keyof typeof routes) => {
    const componentConfig = routes[currentRouteName];
    const props = 'props' in componentConfig ? componentConfig.props : {};
    const RouteComponent: any = componentConfig.component || componentConfig.loader;

    this.setState({
      loadedComponent: <RouteComponent {...props} />,
      loadedComponentName: currentRouteName,
    });
  };

  render() {
    const { loadedComponent } = this.state;

    return loadedComponent;
  }
}
