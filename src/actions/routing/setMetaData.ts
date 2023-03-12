import { TypeMessage } from 'dk-localize';

import { TypeAction } from 'models';

type TypeParams = {
  title: TypeMessage;
  description?: TypeMessage;
  titleParams?: Record<string, any>;
  descriptionParams?: Record<string, any>;
};

export const setMetaData: TypeAction<TypeParams> = ({ store, getLn }, params) => {
  const { title, description, titleParams, descriptionParams } = params;

  store.ui.metaData = {
    title: getLn(title, titleParams),
    description: description ? getLn(description, descriptionParams) : undefined,
  };

  return Promise.resolve();
};
