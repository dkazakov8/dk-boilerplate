import { IReactionDisposer } from 'mobx';
import { getActionsLogs } from 'dk-react-mobx-globals-logger';

import { env } from 'env';
import { TypeGlobals } from 'models';
import { excludeFalsy } from 'utils/tsUtils/excludeFalsy';
import { printMeasures } from 'utils/system/printMeasures';
import { messages } from 'utils/messages';
import { transformers } from 'compSystem/transformers';

const actionsLogs = (globals: TypeGlobals) =>
  getActionsLogs({
    globals,
    isClient: IS_CLIENT,
    actionsLogs: globals.store.router.actionsLogs,
    routerStore: globals.store.router,
    transformers,
  });

function setPageTitle({ store, getLn }: TypeGlobals) {
  /**
   * On route change we only need to update page title, not all meta-tags
   *
   */

  return transformers.autorun(() => {
    document.title = store.ui.metaData?.title || getLn(messages.pageTitleSuffix);
  });
}

function setMobileOrDesktop({ store }: TypeGlobals) {
  return transformers.autorun(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (store.ui.screen.width < 1200) document.body.classList.add('mobile');
    else document.body.classList.remove('mobile');
  });
}

function setScreenSize({ actions }: TypeGlobals) {
  window.addEventListener('resize', actions.ui.setScreenSize);
}

function setScrollTop({ actions }: TypeGlobals) {
  window.addEventListener('scroll', actions.ui.setScrollTop);
}

function handlePageLoaded({ store }: TypeGlobals) {
  window.addEventListener('load', () => {
    const currentRoute = transformers.toJS(store.router.currentRoute);

    if (env.LOGS_MEASURES) printMeasures({ currentRoute });
  });
}

function setManualScrollRestoration() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

export function initAutorun(globals: TypeGlobals): Array<IReactionDisposer | void> {
  return [
    IS_CLIENT && setPageTitle,
    IS_CLIENT && setScrollTop,
    IS_CLIENT && setScreenSize,
    IS_CLIENT && handlePageLoaded,
    IS_CLIENT && setMobileOrDesktop,
    IS_CLIENT && setManualScrollRestoration,
    env.LOGS_EXECUTING_ACTIONS && actionsLogs,
  ]
    .filter(excludeFalsy)
    .map((fn) => fn(globals));
}
