import loadable from '@loadable/component';
import { TypeRoutesGenerator } from 'dk-react-mobx-router';

import { addNames } from 'utils/system/addNames';

const routesObject = addNames({
  first2: {
    path: '/',
    loader: loadable(() => import('pages/first') as any),
    params: {},
  },
  second: {
    path: '/second2',
    loader: loadable(() => import('pages/second') as any),
    params: {},
    before: () => {
      // eslint-disable-next-line no-console
      console.log(1);
    },
  },

  error404: {
    path: '/error404',
    loader: loadable(() => import('pages/error') as any),
    props: { errorNumber: 404 },
    params: {},
  },
  error500: {
    path: '/error500',
    loader: loadable(() => import('pages/error') as any),
    props: { errorNumber: 500 },
    params: {},
  },
});

export const routes = routesObject as TypeRoutesGenerator<typeof routesObject>;

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
