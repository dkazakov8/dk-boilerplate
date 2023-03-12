import { TypeMessage } from 'dk-localize';
import { ReactNode } from 'react';

// eslint-disable-next-line import/no-restricted-paths
import { fieldValidators, fieldFormatters } from 'utils';

import { TypeFieldValidator } from './TypeFieldValidator';
import { TypeInputErrors } from './TypeInputErrors';

export type TypeInputTextConfig = {
  type: 'text' | 'password' | 'textarea' | 'phone';
  value: string;
  errors: TypeInputErrors;
  validators: Partial<Record<keyof typeof fieldValidators, TypeFieldValidator>>;

  id?: string;
  label?: TypeMessage;
  hidden?: boolean;
  noClear?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  maxLength?: number;
  autoFocus?: boolean;
  isFocused?: boolean;
  isValidFn?: (checkOnly?: boolean) => boolean;
  labelData?: Record<string, any>;
  className?: string;
  emptyValue?: string;
  hideErrors?: boolean;
  autoComplete?: any;
  formatters?: Partial<Record<keyof typeof fieldFormatters, (value: string) => string>>;
  placeholder?: TypeMessage;
  appendComponent?: () => ReactNode;
  prependComponent?: () => ReactNode;
  onClear?: () => void;
};
