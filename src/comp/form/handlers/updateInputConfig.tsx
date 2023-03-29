import { transformers } from 'compSystem/transformers';
import { TypeAnyInput } from 'models';

export const updateInputConfig = (inputConfig: TypeAnyInput) => (params: Partial<TypeAnyInput>) => {
  transformers.batch(() => Object.assign(inputConfig, params));
};
