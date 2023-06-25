import { unescapeAllStrings } from 'dk-react-mobx-globals';
import { restoreState } from 'dk-mobx-restore-state';
import { ReactNode } from 'react';

import { env } from 'env';
import { TypeGlobals } from 'models';
import { getTypedEntries, getTypedKeys } from 'utils';

import { transformers } from './transformers';
import { ConnectedComponent } from './ConnectedComponent';

const modularStorePath = 'pages' as const;
const initialData = IS_CLIENT ? window.INITIAL_DATA || {} : {};
const logs = env.LOGS_STORE_SETTER;

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
    this.extendStores();
    this.extendActions();
  }

  log = (message: string) => {
    const logsPrefix = '%c[ModularStoresSetter]%c';

    if (logs) {
      // eslint-disable-next-line no-console
      console.log(`${logsPrefix} ${message}`, ...['color: green', 'color: initial']);
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
          restoreState({
            logs: env.LOGS_RESTORE_INITIAL,
            target: pagesObject[storeName],
            source: unescapeAllStrings(storeInitialData),
            transformers,
          });

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
        // @ts-ignore
        (acc, [actionName, fn]) => {
          acc[actionName] = this.context.createWrappedAction(fn);

          return acc;
        },
        {} as any
      );

      this.log(`actions has been extended with "actions.${modularStorePath}.${actionGroupName}"`);
    });
  };

  render() {
    return this.props.children;
  }
}
