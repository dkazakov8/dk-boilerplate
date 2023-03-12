import { TypeFormSystem, TypeInputTextConfig } from 'models';
import { formClearDefault, fieldValidators } from 'utils';

import { messages } from './messages';

export const formAddress: TypeFormSystem & {
  address: TypeInputTextConfig;
} = {
  address: {
    type: 'text',
    value: '',
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    validators: { minLength: fieldValidators.minLength(3) },
    errors: [],
    placeholder: messages.formAddress_addressPlaceholder,
  },

  SYSTEM: {
    isSubmitting: false,
    get clear() {
      return formClearDefault(formAddress);
    },
  },
};
