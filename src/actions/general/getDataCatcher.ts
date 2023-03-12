import { findRouteByPathname } from 'dk-react-mobx-globals/dist/utils/findRouteByPathname';

import { TypeAction } from 'models';
import { errorsNames } from 'const';
import { routes } from 'routes';

type TypeParams = Error;

export const getDataCatcher: TypeAction<TypeParams> = ({ actions }, error) => {
  if (IS_CLIENT && error.name === errorsNames.REDIRECT) {
    return actions.routing.redirectTo({
      route: findRouteByPathname({ pathname: error.message, routes }),
    });
  }

  return Promise.resolve();
};
