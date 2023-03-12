import _values from 'lodash/values';

import { TypeAnyInput } from 'models';

import { updateInputConfig } from './updateInputConfig';

export const isValidFn = (inputConfig: TypeAnyInput) => (checkOnly?: boolean) => {
  if (inputConfig.disabled || inputConfig.hidden) return true;

  const errors = _values(inputConfig.validators as Required<typeof inputConfig.validators>).filter(
    ({ notValidCheck }) => notValidCheck({ value: inputConfig.value })
  );

  if (!checkOnly) updateInputConfig(inputConfig)({ errors });

  return errors.length === 0;
};
