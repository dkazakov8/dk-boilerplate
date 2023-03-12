import path from 'path';

import { runServer } from 'dk-bff-server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import { escapeAllStrings, mockActions } from 'dk-react-mobx-globals';

import { App } from 'comp/app';
import { initAutorun } from 'autorun';
import { StoreContext } from 'compSystem/StoreContext';
import { createGlobals } from 'compSystem/createGlobals';
import { analytic } from 'serverUtils/analytic';
import { handleQuery } from 'serverUtils/handleQuery';
import { helmetOptions } from 'serverUtils/helmetOptions';

import { env } from '../env';
import { paths } from '../paths';

import { initSentry } from './initSentry';
import { objToStyle } from './utils/system/objToStyle';
import { isomorphPolyfills } from './utils/system/isomorphPolyfills';
import { createSocketServer } from './socketServer';
import { waitActionsToBeCompleted } from './utils/system/waitActionsToBeCompleted';
import { healthcheck, styleGuideRoute } from './serverUtils/middleware';

process.title = 'node: bff-server';

initSentry();
isomorphPolyfills();

void runServer({
  port: env.EXPRESS_PORT,
  https: env.HTTPS_BY_NODE,
  templatePath: path.resolve(paths.build, 'template.html'),
  template500Path: path.resolve(paths.build, 'error500.html'),
  staticFilesPath: paths.build,
  versionIdentifier: env.GIT_COMMIT,
  compressedFilesGenerated: env.GENERATE_COMPRESSED,
  maxAgeForStatic: env.STATIC_MAX_AGE || undefined,
  customMiddlewares: [
    (app) => {
      healthcheck(app);
      styleGuideRoute(app);
    },
  ],
  // @ts-ignore
  templateModifier: ({ template, req, res }) => {
    /**
     * Firstly renderToString triggers componentWillMount in all React tree,
     * which may call async actions, so we have to wait until actionsFirstCompleted === true
     *
     * Secondly, all actions are mocked and App rerenders using final contextProps.store
     * (that was mutated by those actions)
     *
     * This technique allows to fetch data in ssr-mode in componentWillMount and supports async chunks,
     * the one disadvantage is renderToString called twice.
     *
     */

    const globals = createGlobals(req, res);

    try {
      handleQuery(globals);
    } catch (error) {
      console.error(error);
    }

    const webExtractor = new ChunkExtractor({
      statsFile: path.resolve(paths.build, 'web-loadable-stats.json'),
      entrypoints: ['client'],
    });

    const app = (
      // @ts-ignore
      <ChunkExtractorManager extractor={webExtractor}>
        <StoreContext.Provider value={globals}>
          <App />
        </StoreContext.Provider>
      </ChunkExtractorManager>
    );

    const autorunDisposers = initAutorun(globals);

    return Promise.resolve()
      .then(() => globals.actions.server.beforeRender())
      .then(() => globals.actions.routing.redirectTo({ pathname: req.originalUrl }))
      .then(() => renderToString(app))
      .then(() => waitActionsToBeCompleted(globals))
      .then(() => autorunDisposers.forEach((disposer) => disposer?.()))
      .then(() => mockActions(globals.actions))
      .then(() => renderToString(app))
      .then((htmlMarkup) => {
        const storeJS = JSON.parse(JSON.stringify(globals.store)) as typeof globals.store;

        const hotReloadUrl = `${env.HTTPS_BY_NODE ? 'https' : 'http'}://${req.headers.host}:${
          env.HOT_RELOAD_PORT
        }`;

        const finalMarkup = template
          .replace(`<!-- HTML -->`, htmlMarkup)
          .replace(
            '<!-- LINKS -->',
            [webExtractor.getLinkTags(), webExtractor.getStyleTags()].join('\n')
          )
          .replace('<!-- SCRIPTS -->', webExtractor.getScriptTags())
          .replace(
            '<!-- SERVER_CONFIG -->',
            JSON.stringify({
              API_HOST: env.API_HOST,
            })
          )
          .replace(`<!-- TITLE -->`, storeJS.ui.metaData?.title || '')
          .replace(`<!-- DESCRIPTION -->`, storeJS.ui.metaData?.description || '')
          .replace('<!-- THEME -->', objToStyle(storeJS.ui.themeParams))
          .replace('<!-- INITIAL_DATA -->', JSON.stringify(escapeAllStrings(storeJS)))
          .replace(
            '<!-- HOT_RELOAD -->',
            env.HOT_RELOAD ? `<script src="${hotReloadUrl}"></script>` : ''
          )
          .replace('<!-- SENTRY -->', env.SENTRY_URL ? analytic.sentryScript : '');

        return finalMarkup;
      });
  },
  injectMeasures: ({ template, measures }) =>
    template.replace('<!-- MEASURES -->', JSON.stringify({ server: measures }, null, 2)),
  helmetOptions,
}).then(createSocketServer);
