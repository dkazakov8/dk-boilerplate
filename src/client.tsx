import './styles/global.scss';
import { loadableReady } from '@loadable/component';
import { hydrateRoot } from 'react-dom/client';
// eslint-disable-next-line no-restricted-imports
import _omitBy from 'lodash/omitBy';
import { unescapeAllStrings } from 'dk-react-mobx-globals';
import { restoreState } from 'dk-mobx-restore-state';

import { App } from 'comp/app';
import { transformers } from 'compSystem/transformers';
import { StoreContext } from 'compSystem/StoreContext';
import { createGlobals } from 'compSystem/createGlobals';
import { initAutorun } from 'autorun';
import { isomorphPolyfills } from 'utils';
import { env } from 'env';

isomorphPolyfills();

const globals = createGlobals();

window.globals = globals;

const initialData = _omitBy(
  window.INITIAL_DATA,
  (value, key) => !Object.keys(globals.store).includes(key)
);

void Promise.resolve()
  .then(() => loadableReady())
  .then(() => {
    restoreState({
      logs: env.LOGS_RESTORE_INITIAL,
      target: globals.store,
      source: unescapeAllStrings(initialData),
      transformers,
    });
  })
  .then(() => initAutorun(globals))
  .then(() => globals.actions.client.beforeRender())
  .then(() =>
    globals.actions.routing.redirectTo({ pathname: globals.store.router.routesHistory[0] })
  )
  .then(() =>
    hydrateRoot(
      document.getElementById('app')!,
      <StoreContext.Provider value={globals}>
        <App />
      </StoreContext.Provider>
    )
  );
