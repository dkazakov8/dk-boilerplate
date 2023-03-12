import { TypeAnyInput, TypeInputTextConfig } from 'models';

import { isValidFn } from './isValidFn';
import { updateInputConfig } from './updateInputConfig';

export const handleBlur =
  (
    component: {
      isValidFn: ReturnType<typeof isValidFn>;
      updateInputConfig: ReturnType<typeof updateInputConfig>;
    },
    inputConfig: TypeAnyInput
  ) =>
  () => {
    component.updateInputConfig({
      isFocused: false,
      value:
        inputConfig.value === '' && (inputConfig as TypeInputTextConfig).emptyValue
          ? (inputConfig as TypeInputTextConfig).emptyValue
          : inputConfig.value,
    });
    component.isValidFn();
  };
