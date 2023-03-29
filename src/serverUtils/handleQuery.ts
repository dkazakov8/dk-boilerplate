import _size from 'lodash/size';

import { transformers } from 'compSystem/transformers';
import { TypeGlobals } from 'models';

export const handleQuery = (globals: TypeGlobals) => {
  const { req } = globals;

  if (!req) return;

  if (_size(req.query) > 0) {
    transformers.batch(() => {
      req.query = {};
      req.originalUrl = req.originalUrl.replace(/\?.+/, '');
    });
  }
};
