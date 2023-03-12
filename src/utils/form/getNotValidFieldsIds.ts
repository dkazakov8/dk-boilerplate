import _omit from 'lodash/omit';
import _values from 'lodash/values';

import { TypeFormConfig } from 'models';

export function getNotValidFieldsIds({ formConfig }: { formConfig: Partial<TypeFormConfig<any>> }) {
  const formConfigWithoutSystem = _omit(formConfig, ['SYSTEM', 'submit']);

  return _values(formConfigWithoutSystem)
    .filter((fieldData) => {
      if (fieldData?.validators.emptyString || fieldData?.errors.length) {
        return !fieldData?.isValidFn?.();
      }

      return false;
    })
    .map((fieldData) => fieldData?.id as string);
}
