import { transformers } from 'compSystem/transformers';
import { TypeAnyInput } from 'models';

import { updateInputConfig } from './updateInputConfig';

export const clearErrorsOnDisabledChange = (inputConfig: TypeAnyInput) => {
  return transformers.autorun(() => {
    if (inputConfig.disabled === true && inputConfig.errors.length)
      updateInputConfig(inputConfig)({ errors: [] });
  });
};
