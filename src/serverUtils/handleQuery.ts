import _size from 'lodash/size';
import { runInAction } from 'mobx';

import { TypeGlobals } from 'models';

export const handleQuery = (globals: TypeGlobals) => {
  const { req } = globals;

  if (!req) return;

  if (_size(req.query) > 0) {
    runInAction(() => {
      req.query = {};
      req.originalUrl = req.originalUrl.replace(/\?.+/, '');
    });
  }
};
