import { TypeInputTextConfig } from 'models';

import { updateInputConfig } from './updateInputConfig';

export const handleChange = (
  component: { updateInputConfig: ReturnType<typeof updateInputConfig> },
  inputConfig: TypeInputTextConfig,
  value: string
) => {
  let valueFormatted = value;

  if (inputConfig.formatters) {
    Object.values(inputConfig.formatters).forEach((formatterFn) => {
      valueFormatted = formatterFn!(value);
    });
  }

  valueFormatted = valueFormatted.trimLeft();

  component.updateInputConfig({ value: valueFormatted });
};
