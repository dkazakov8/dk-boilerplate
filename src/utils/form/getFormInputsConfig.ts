import _omit from 'lodash/omit';

import { TypeFormConfigFields, TypeFormSystem } from 'models';

export function getFormInputsConfig<T extends TypeFormSystem>(
  formConfig: T
): TypeFormConfigFields<T> {
  return _omit(formConfig, ['SYSTEM', 'submit']);
}
