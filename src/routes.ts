import loadable from '@loadable/component';
import { TypeRoutesGenerator } from 'dk-react-mobx-globals';

import { addNames } from 'utils/system/addNames';

const routesObject = addNames({
  first: {
    name: 'first' as const,
    path: '/',
    loader: loadable(() => import('pages/first/Extender')),
    params: {},
  },
  second: {
    name: 'second' as const,
    path: '/second',
    loader: loadable(() => import('pages/second/Extender')),
    params: {},
    before: () => {
      // eslint-disable-next-line no-console
      console.log(1);
    },
  },

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

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
