import { redirectToGenerator, TypeRedirectToParams } from 'dk-react-mobx-router';

import { routes } from 'routes';
import { history } from 'utils';
import { TypeAction } from 'models';
import { transformers } from 'compSystem/transformers';

export const redirectTo: TypeAction<TypeRedirectToParams<typeof routes>> = (globals, params) => {
  if (IS_CLIENT) {
    window.scroll(0, 0);
  }

  return redirectToGenerator({
    routes,
    history,
    globals,
    isClient: IS_CLIENT,
    redirectTo: globals.actions.routing.redirectTo,
    routerStore: globals.store.router,
    routeError404: routes.error404,
    routeError500: routes.error500,
    transformers,
  })(params);
};
