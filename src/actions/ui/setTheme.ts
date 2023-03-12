import { runInAction } from 'mobx';

import { themes } from 'const';
import { TypeAction } from 'models';
import { setThemeToHTML } from 'utils';

type TypeParams = { theme: keyof typeof themes };

export const setTheme: TypeAction<TypeParams> = ({ store }, { theme }) => {
  if (!store.ui.themesList.includes(theme)) return Promise.resolve();

  const themeObject = themes[theme];

  runInAction(() => {
    store.ui.currentTheme = theme;
    store.ui.themeParams = themeObject;
  });

  if (IS_CLIENT) setThemeToHTML(themeObject);

  return Promise.resolve();
};
