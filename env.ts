import { TypeDevtool } from 'dk-webpack-config';

class Env {
  constructor(params: Env) {
    Object.entries(params).forEach(([envKey, envValue]) => {
      // @ts-ignore
      const paramType = typeof this[envKey];

      if (paramType === 'boolean') {
        // @ts-ignore
        this[envKey] = envValue === true || envValue === 'true';
      } else if (paramType === 'string') {
        // @ts-ignore
        this[envKey] = (envValue || '').replace(/"/g, '').trim();
      } else if (paramType === 'number') {
        // @ts-ignore
        this[envKey] = Number(envValue || 0);
      }
    });
  }

  SENTRY_URL = '';
  SENTRY_ENV = '';
  GIT_COMMIT = '';
  HOT_RELOAD = false;
  HOT_RELOAD_PORT = 0;
  POLYFILLING = false;
  FILENAME_HASH = false;
  CIRCULAR_CHECK = false;
  BUNDLE_ANALYZER = false;
  MINIMIZE_CLIENT = false;
  MINIMIZE_SERVER = false;
  BUILD_MEASURE = false;
  BUILD_MEASURE_SERVER = false;
  IMAGE_COMPRESSION = 0;
  GENERATE_COMPRESSED = false;
  BUNDLE_ANALYZER_PORT = 0;
  START_SERVER_AFTER_BUILD = false;
  DEV_TOOL: TypeDevtool = 'eval-cheap-module-source-map';
  DEV_TOOL_SERVER: TypeDevtool = 'eval-cheap-module-source-map';
  GENERATOR_AGGREGATION_TIMEOUT = 0;
  RELOAD_BROWSER_AGGREGATION_TIMEOUT = 0;

  SSR_ENABLED = false;
  SG_BUILD_ENABLED = false;
  NODE_ENV: 'development' | 'production' = 'development';
  NODE_PATH = '';
  NODE_OPTIONS = '';
  EXPRESS_PORT = 0;
  HTTPS_BY_NODE = false;
  API_HOST = '';
  API_HOST_SERVER = '';
  SG_PORT = 0;
  STATIC_MAX_AGE = '';

  LOGS_MEASURES = false;
  LOGS_STORE_SETTER = false;
  LOGS_WATCHED_FILES = false;
  LOGS_RELOAD_BROWSER = false;
  LOGS_RESTORE_INITIAL = false;
  LOGS_CANCELED_ACTIONS = false;
  LOGS_EXECUTING_ACTIONS = false;
  LOGS_GENERATION_DETAILS = false;
}

/**
 * Global environment params take precedence over .env file
 * for passing vars in Docker image or running in CI
 *
 */

// eslint-disable-next-line no-process-env
const envInstance = new Env(process.env as unknown as Env);

export const env: Env =
  typeof IS_CLIENT !== 'undefined' && IS_CLIENT
    ? ({
        API_HOST: envInstance.API_HOST,
        NODE_ENV: envInstance.NODE_ENV,
        GIT_COMMIT: envInstance.GIT_COMMIT,
        LOGS_MEASURES: envInstance.LOGS_MEASURES,
        LOGS_STORE_SETTER: envInstance.LOGS_STORE_SETTER,
        LOGS_RESTORE_INITIAL: envInstance.LOGS_RESTORE_INITIAL,
        LOGS_CANCELED_ACTIONS: envInstance.LOGS_CANCELED_ACTIONS,
        LOGS_EXECUTING_ACTIONS: envInstance.LOGS_EXECUTING_ACTIONS,
      } as any)
    : envInstance;
