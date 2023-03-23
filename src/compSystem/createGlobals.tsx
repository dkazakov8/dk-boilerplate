import _mapValues from 'lodash/mapValues';
import { getLn } from 'dk-localize';
import { createCheckers } from 'ts-interface-checker';
import { createContextProps } from 'dk-react-mobx-globals';

import { TypeGlobals } from 'models';
import * as api from 'api';
import { request } from 'utils';
import globalActions from 'actions';
import * as staticStores from 'stores';
import * as apiValidatorsTypes from 'validators/api';

import { transformers } from './transformers';

const apiValidators = _mapValues(apiValidatorsTypes, (value) => createCheckers(value));

export function createGlobals(req?: TypeGlobals['req'], res?: TypeGlobals['res']) {
  const globals = createContextProps<TypeGlobals>({
    req,
    res,
    api,
    request,
    transformers,
    staticStores,
    apiValidators,
    globalActions,
  });

  globals.getLn = getLn.bind(null, globals.store.ui.lnData);

  return globals;
}
