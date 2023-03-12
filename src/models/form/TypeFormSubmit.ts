import { FormEvent } from 'react';

import { TypeFormConfig } from './TypeFormConfig';

export type TypeFormSubmit<T extends TypeFormConfig<T>> = (
  // @ts-ignore
  formData: { [Key in keyof Omit<T, 'SYSTEM' | 'submit'>]: T[Key]['value'] },
  event: FormEvent
) => Promise<any>;
