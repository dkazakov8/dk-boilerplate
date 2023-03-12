import { updateInputConfig } from './updateInputConfig';

export const handleFocus =
  (component: { updateInputConfig: ReturnType<typeof updateInputConfig> }) => () => {
    component.updateInputConfig({ isFocused: true, errors: [] });
  };
