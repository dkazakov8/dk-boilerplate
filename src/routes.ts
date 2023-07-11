import loadable from '@loadable/component';
import { TypeRoutesGenerator } from 'dk-react-mobx-globals';

import { addNames } from 'utils/system/addNames';

const routesObject = addNames({
  first2: {
    path: '/',
    pageName: 'first',
    loader: loadable(() => import('pages/first/First') as any),
    params: {},
  },
  second: {
    path: '/second',
    pageName: 'second',
    loader: loadable(() => import('pages/second/Second') as any),
    params: {},
    before: () => {
      // eslint-disable-next-line no-console
      console.log(1);
    },
  },

  error404: {
    path: '/error404',
    pageName: 'error',
    loader: loadable(() => import('pages/error/Error') as any),
    props: { errorNumber: 404 },
    params: {},
  },
  error500: {
    path: '/error500',
    pageName: 'error',
    loader: loadable(() => import('pages/error/Error') as any),
    props: { errorNumber: 500 },
    params: {},
  },
});

export const routes = routesObject as TypeRoutesGenerator<typeof routesObject>;

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
