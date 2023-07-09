import '@types/intercom-web';
import '@types/segment-analytics';
import { getLn } from 'dk-localize';
import {
  TypeActionGenerator,
  TypeApiErrorGenerator,
  TypeApiRequestGenerator,
  TypeApiResponseGenerator,
  TypeGlobalsGenerator,
} from 'dk-react-mobx-globals';

// eslint-disable-next-line import/no-restricted-paths
import modularStores from 'modularStores';
// eslint-disable-next-line import/no-restricted-paths
import globalActions from 'actions';
// eslint-disable-next-line import/no-restricted-paths
import modularActions from 'modularActions';
// eslint-disable-next-line import/no-restricted-paths
import * as api from 'api';
// eslint-disable-next-line import/no-restricted-paths
import * as staticStores from 'stores';
// eslint-disable-next-line import/no-restricted-paths
/**
 * Actions
 *
 * every action function should be of TypeAction type, ex.
 *
 * export const myAction: TypeAction = (globals) => Promise.resolve()
 * export const myAction: TypeAction<{someParam: string}> = (globals, params) => Promise.resolve()
 *
 * They must always return Promise<void>.
 * if you need to place the result in store or perform data formatting, do it in action itself
 *
 */

export type TypeAction<T = undefined> = TypeActionGenerator<TypeGlobals, T>;

/**
 * Api
 *
 * use TypeApiRequest<'someApiName'> in actions params for DRY when they call api
 * use TypeApiResponse<'someApiName'> in stores when there are no separate models for the response
 * use TypeApiError<'someApiName'> when need to handle error in Promise.all of actions
 *
 */

type TypeApiRaw = typeof api;

export type TypeApiRequest<TApiName extends keyof TypeApiRaw> = TypeApiRequestGenerator<
  TypeApiRaw,
  TApiName
>;

export type TypeApiResponse<TApiName extends keyof TypeApiRaw> = TypeApiResponseGenerator<
  TypeApiRaw,
  TApiName
>;

export type TypeApiError<TApiName extends keyof TypeApiRaw> = TypeApiErrorGenerator<
  TypeApiRaw,
  TApiName
>;

/**
 * Globals
 *
 * includes { api, store, actions, getLn, createWrappedAction }
 * use in every action (first argument) or connected React component (this.context)
 *
 * Good practice:
 * - use api only in actions (this way it is easy to attach handlers)
 * - don't use createWrappedAction unless absolutely necessary
 *
 */

export type TypeGlobals = TypeGlobalsGenerator<
  TypeApiRaw,
  typeof staticStores,
  typeof modularStores,
  typeof globalActions,
  typeof modularActions,
  typeof getLn
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/naming-convention
  interface Window {
    MEASURES: Record<string, any>;
    INITIAL_DATA: Partial<TypeGlobals['store']>;
    SERVER_CONFIG: {
      API_HOST: string;
    };
    api?: TypeGlobals['api'];
    globals?: TypeGlobals;
  }
}
