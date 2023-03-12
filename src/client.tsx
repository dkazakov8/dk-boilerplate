import './styles/global.scss';
import { loadableReady } from '@loadable/component';
import { hydrateRoot } from 'react-dom/client';
// eslint-disable-next-line no-restricted-imports
import _omitBy from 'lodash/omitBy';
import { mergeObservableDeep, unescapeAllStrings } from 'dk-react-mobx-globals';

import { App } from 'comp/app';
import { StoreContext } from 'compSystem/StoreContext';
import { createGlobals } from 'compSystem/createGlobals';
import { initAutorun } from 'autorun';
import { isomorphPolyfills } from 'utils';

if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
  performance.mark('headParsed-appScriptEvalStart');
  performance.measure('headParsed-appScriptEvalStart', 'headParsed');
}

isomorphPolyfills();

const globals = createGlobals();

window.globals = globals;

const initialData = _omitBy(
  window.INITIAL_DATA,
  (value, key) => !Object.keys(globals.store).includes(key)
);

// let root: Root;

void Promise.resolve()
  .then(() => loadableReady())
  .then(() => mergeObservableDeep(globals.store, unescapeAllStrings(initialData)))
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
// .then((r) => (root = r));

// window.TEST_RERENDER = () =>
//   root!.render(
//     <StoreContext.Provider value={globals}>
//       <App />
//     </StoreContext.Provider>
//   );
