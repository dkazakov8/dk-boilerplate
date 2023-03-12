import { TypeMessage } from 'dk-localize';

// eslint-disable-next-line import/no-restricted-paths
import { fieldValidators } from 'utils';

import { TypeFieldValidator } from './TypeFieldValidator';
import { TypeInputErrors } from './TypeInputErrors';

export type TypeInputCheckboxConfig = {
  type: 'checkbox';
  value: boolean;
  errors: TypeInputErrors;
  validators: Partial<Record<keyof typeof fieldValidators, TypeFieldValidator>>;

  id?: string;
  label?: TypeMessage;
  hidden?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  isFocused?: boolean;
  isValidFn?: (checkOnly?: boolean) => boolean;
  labelData?: Record<string, any>;
  className?: string;
};
