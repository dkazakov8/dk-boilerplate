import { createModularStoresSetter } from 'dk-react-mobx-globals';
import { ReactNode } from 'react';

import { env } from 'env';
import { TypeGlobals } from 'models';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModularStoresSetterComponent = createModularStoresSetter<TypeGlobals>();

export class ModularStoresSetter extends ConnectedComponent<{
  stores?: Partial<TypeGlobals['store']>;
  actions?: Partial<TypeGlobals['actions']>;
  children: ReactNode;
  noActionsCancel?: boolean;
}> {
  componentDidMount() {
    const { store } = this.context;

    if (!store.ui.frontLoaded) {
      transformers.batch(() => {
        store.ui.frontLoaded = true;
      });

      document.body.classList.add('loaded');
    }
  }

  render() {
    return (
      <ModularStoresSetterComponent
        {...this.props}
        globalContext={this.context}
        modularStorePath={'pages'}
        logs={env.LOGS_STORE_SETTER}
        initialData={IS_CLIENT ? window.INITIAL_DATA || {} : {}}
        logsCanceledActions={env.LOGS_CANCELED_ACTIONS}
        transformers={transformers}
      />
    );
  }
}
