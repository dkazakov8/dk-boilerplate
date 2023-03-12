import { runInAction } from 'mobx';

import { TypeAnyInput } from 'models';

export const updateInputConfig = (inputConfig: TypeAnyInput) => (params: Partial<TypeAnyInput>) => {
  runInAction(() => Object.assign(inputConfig, params));
};
