import loadable from '@loadable/component';
import { TypeRoutesGenerator } from 'dk-react-mobx-globals';

import { addNames } from 'utils/system/addNames';

const routesObject = addNames({
  catalog: {
    path: '/',
    loader: loadable(() => import('pages/catalog/Extender')),
    params: {},
  },

  // cart: {
  //   path: '/cart',
  //   loader: loadable(() => import('pages/cart/Extender')),
  //   params: {},
  //   beforeEnter: ({ store }: TypeGlobals) => {
  //     if (store.user.isUnauthorized || !store.cart.cartShort?.items.length) {
  //       return Promise.resolve({ route: routes.catalog });
  //     }
  //
  //     return Promise.resolve();
  //   },
  //   beforeLeave: (globals: TypeGlobals) => {
  //     if (!IS_CLIENT) return Promise.resolve();
  //
  //     return globals.actions.cart.getCartShort();
  //   },
  // },

  error404: {
    path: '/error404',
    loader: loadable(() => import('pages/error/Extender')),
    props: { errorNumber: 404 },
    params: {},
  },
  error500: {
    path: '/error500',
    loader: loadable(() => import('pages/error/Extender')),
    props: { errorNumber: 500 },
    params: {},
  },
});

export const routes = routesObject as TypeRoutesGenerator<typeof routesObject>;

export type TypeRouteValues = typeof routes[keyof typeof routes];
