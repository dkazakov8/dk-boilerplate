import { observer } from 'mobx-react';
import { Component } from 'react';

import { TypeGlobals } from 'models';

import { StoreContext } from './StoreContext';

export class ConnectedComponent<TProps = any, TRoute = never> extends Component<TProps, any> {
  // SSR not able to recalculate components on observable updates,
  // so on server side it has to be rendered twice
  static observer = IS_CLIENT ? observer : (someComponent: any) => someComponent;

  // Describe context, so no boilerplate in components needed
  static context: TypeGlobals;
  static contextType = StoreContext;
  declare context: {
    store: Omit<TypeGlobals['store'], 'router'> & {
      router: Omit<TypeGlobals['store']['router'], 'currentRoute'> & { currentRoute: TRoute };
    };
  } & Omit<TypeGlobals, 'store'>;
}
