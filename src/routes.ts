import loadable from '@loadable/component';
import { createRouterConfig } from 'dk-react-mobx-router';

export const routes = createRouterConfig({
  first2: {
    path: '/',
    loader: loadable(() => import('pages/first') as any),
    params: {},
  },
  second: {
    path: '/second2/:id',
    loader: loadable(() => import('pages/second') as any),
    validators: {
      id: (id) => id.length !== 0,
    },
    params: { id: '1' as string },
    beforeEnter: () => {
      // eslint-disable-next-line no-console
      console.log(1);

      return Promise.resolve();
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
} as const);

export type TypeRouteValues = (typeof routes)[keyof typeof routes];
