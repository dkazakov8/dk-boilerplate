import { mergeObservableDeep, unescapeAllStrings } from 'dk-react-mobx-globals';
import { ReactNode } from 'react';

import { env } from 'env';
import { TypeGlobals } from 'models';
import { getTypedEntries, getTypedKeys } from 'utils';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

const modularStorePath = 'pages' as const;
const initialData = IS_CLIENT ? window.INITIAL_DATA || {} : {};
const logs = env.LOGS_STORE_SETTER;
const logsCanceledActions = env.LOGS_CANCELED_ACTIONS;

// type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export class ModularStoresSetter extends ConnectedComponent<{
  stores?: Partial<TypeGlobals['store'][typeof modularStorePath]>;
  actions?: Partial<TypeGlobals['actions'][typeof modularStorePath]>;
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

  UNSAFE_componentWillMount() {
    if (!this.context.store[modularStorePath]) {
      this.context.store[modularStorePath] = {} as any;

      this.log(`store has been extended with empty "store.${modularStorePath}" object`);
    }

    if (!this.context.actions[modularStorePath]) {
      this.context.actions[modularStorePath] = {} as any;

      this.log(`actions has been extended with empty "actions.${modularStorePath}" object`);
    }

    this.extendStores();
    this.extendActions();
  }

  componentWillUnmount() {
    const { noActionsCancel } = this.props;

    if (!noActionsCancel) {
      this.cancelExecutingApi();
      this.cancelExecutingActions();
    }

    this.clearPages();
  }

  log = (message: string) => {
    const logsPrefix = '%c[ModularStoresSetter]%c';

    if (logs) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: initial']);
    }
  };

  logCanceled = (message: string) => {
    const logsPrefix = '%c[ModularStoresSetter] %c[canceled]%c';

    if (logsCanceledActions) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: red', 'color: initial']);
    }
  };

  cancelExecutingApi = () => {
    const apiExecuting = Object.values(this.context.api).filter(
      (apiFn) => apiFn.state?.isExecuting
    );

    if (apiExecuting.length) {
      transformers.batch(() => {
        apiExecuting.forEach((apiFn) => {
          apiFn.state.isCancelled = true;
        });
      });

      this.logCanceled(apiExecuting.map((apiFn) => `api.${apiFn.name}`).join(', '));
    }
  };

  cancelExecutingActions = () => {
    const { actions } = this.props;

    if (!actions) return;

    const moduleName = Object.keys(actions)[0];
    const moduleActionsExecuting = Object.entries(
      // @ts-ignore
      this.context.actions[modularStorePath][moduleName]
    ).filter(([, actionFn]) => (actionFn as any).state?.isExecuting);

    if (moduleActionsExecuting.length) {
      transformers.batch(() => {
        moduleActionsExecuting.forEach(([, actionFn]) => {
          (actionFn as any).state.isCancelled = true;
        });
      });

      this.logCanceled(
        moduleActionsExecuting.map(([actionName]) => `${moduleName}.${actionName}`).join(', ')
      );
    }
  };

  extendStores = () => {
    const { stores } = this.props;

    if (!stores) return;

    const pagesObject = this.context.store[modularStorePath];
    const initialPagesData = initialData[modularStorePath];

    getTypedKeys(stores).forEach((storeName) => {
      if (pagesObject[storeName]) return;

      /**
       * Client should recreate dynamic stores with initial data passed from server,
       * because SSR does not serialize get() & set() statements
       *
       */

      // @ts-ignore
      pagesObject[storeName] = new stores[storeName]!();

      this.log(`store has been extended with "store.${modularStorePath}.${storeName}"`);

      if (initialPagesData) {
        const storeInitialData = initialPagesData[storeName];

        if (storeInitialData) {
          mergeObservableDeep(
            pagesObject[storeName],
            unescapeAllStrings(storeInitialData),
            transformers
          );

          this.log(
            `data for "store.${modularStorePath}.${storeName}" has been restored from initial object`
          );
        }

        /**
         * Delete from variable for clear SPA experience on navigation (back/forward)
         * so when user comes back to the first loaded page he won't see too old data
         *
         */

        delete initialData[modularStorePath];

        this.log(`"${modularStorePath}" has been deleted from initial object`);
      }
    });
  };

  extendActions = () => {
    const { actions } = this.props;

    if (!actions) return;

    /**
     * When actions are mocked during SSR no need to waste time on wrapping
     *
     */

    const pagesObject = this.context.actions[modularStorePath];

    getTypedKeys(actions).forEach((actionGroupName) => {
      if (pagesObject[actionGroupName]) return;

      const actionGroup = actions[actionGroupName]!;

      pagesObject[actionGroupName] = getTypedEntries(actionGroup).reduce(
        (acc, [actionName, fn]) => {
          acc[actionName] = this.context.createWrappedAction(fn);

          return acc;
        },
        {} as any
      );

      this.log(`actions has been extended with "actions.${modularStorePath}.${actionGroupName}"`);
    });
  };

  clearPages = () => {
    this.context.store[modularStorePath] = {} as any;
    this.context.actions[modularStorePath] = {} as any;

    this.log(`"store.${modularStorePath}" and "actions.${modularStorePath}" has been emptied`);
  };

  render() {
    return this.props.children;
  }
}
