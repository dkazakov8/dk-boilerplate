import { transformers } from 'compSystem/transformers';

import { getTypedKeys } from '../tsUtils/getTypedKeys';

import { getFormInputsConfig } from './getFormInputsConfig';

export function formClearDefault<T>(formConfigOriginal: T) {
  return ({ formConfigInStore }: { formConfigInStore: T }) => {
    const formConfigWithoutSystem =
      // @ts-ignore
      getFormInputsConfig<typeof formConfigInStore>(formConfigInStore);

    transformers.batch(() => {
      getTypedKeys(formConfigWithoutSystem).forEach((name) => {
        // @ts-ignore
        formConfigInStore[name].value = formConfigOriginal[name].value;
        // @ts-ignore
        formConfigInStore[name].validators = formConfigOriginal[name].validators;
      });
    });
  };
}
