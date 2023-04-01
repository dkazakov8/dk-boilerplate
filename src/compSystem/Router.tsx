/* eslint-disable react/no-set-state, @typescript-eslint/naming-convention */

import { ReactElement } from 'react';

import { routes, TypeRouteValues } from 'routes';
import { appendAutorun, history } from 'utils';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

const Dumb = () => null;

export class Router extends ConnectedComponent<
  {
    wrapperClassName?: string;
  },
  TypeRouteValues
> {
  state: {
    loadedComponent?: ReactElement;
    loadedComponentName?: keyof typeof routes;
  } = {
    loadedComponent: undefined,
    loadedComponentName: undefined,
  };

  UNSAFE_componentWillMount() {
    this.redirectOnHistoryPop();
    appendAutorun(this, this.setLoadedComponent);
  }

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
      // trigger componentWillUnmount on previous component to clear executed actions
      this.setState({ loadedComponent: <Dumb /> }, () => this.setComponent(currentRouteName));
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
    const { wrapperClassName } = this.props;

    return <div className={wrapperClassName}>{loadedComponent}</div>;
  }
}
