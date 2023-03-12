import { autorun } from 'mobx';

import { TypeAnyInput } from 'models';

import { updateInputConfig } from './updateInputConfig';

export const clearErrorsOnDisabledChange = (inputConfig: TypeAnyInput) => {
  return autorun(() => {
    if (inputConfig.disabled === true && inputConfig.errors.length)
      updateInputConfig(inputConfig)({ errors: [] });
  });
};
