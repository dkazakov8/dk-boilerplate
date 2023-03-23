import { createRouter } from 'dk-react-mobx-globals';

import { routes } from 'routes';
import { history } from 'utils';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

// eslint-disable-next-line @typescript-eslint/naming-convention
const RouterComponent = createRouter<typeof routes>();

export class Router extends ConnectedComponent<{
  wrapperClassName?: string;
}> {
  render() {
    return (
      <RouterComponent
        routes={routes}
        history={history}
        redirectTo={this.context.actions.routing.redirectTo}
        routerStore={this.context.store.router}
        wrapperClassName={this.props.wrapperClassName}
        transformers={transformers}
      />
    );
  }
}
